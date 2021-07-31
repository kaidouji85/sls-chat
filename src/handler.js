// @flow

import type {Response} from './respponse/response';
import {createDynamoDBClient} from "./dynamo-db/client";
import {SLSChatConnections} from "./dynamo-db/sls-chat-cpnnections";
import type {Event} from './lambda/event';
import {createAPIGatewayManagement} from "./api-gateway/management";
import {apiGatewayEndpoint} from "./api-gateway/api-gateway-endpoint";

const AWS_REGION = process.env.AWS_REGION ?? '';
const SLS_CHAT_CONNECTIONS = process.env.SLS_CHAT_CONNECTIONS ?? '';
const dynamoClient = createDynamoDBClient(AWS_REGION);

/**
 * $connect エントリポイント
 *
 * @param event イベント
 * @return レスポンス
 */
export async function connect(event: Event): Promise<Response> {
  try {
    const dao = new SLSChatConnections(dynamoClient, SLS_CHAT_CONNECTIONS);
    const connection = {connectionId: event.requestContext.connectionId}
    await dao.put(connection);
    return {statusCode: 200, body: 'connected.'};
  } catch(err) {
    console.error(err);
    return {statusCode: 500, body: 'connection error'};
  }
}

/**
 * $disconnect エントリポイント
 *
 * @param event イベント
 * @return レスポンス
 */
export async function disconnect(event: Event): Promise<Response> {
  try {
    const dao = new SLSChatConnections(dynamoClient, SLS_CHAT_CONNECTIONS);
    const connectionId = event.requestContext.connectionId;
    await dao.delete(connectionId);
    return {statusCode: 200, body: 'disconnected'};
  } catch(err) {
    console.error(err);
    return {statusCode: 500, body: 'disconnect error'};
  }
}

/**
 * sendMessage エントリポイント
 *
 * @param event イベント
 * @return レスポンス
 */
export async function sendMessage(event: Event): Promise<Response> {
  try {
    const dao = new SLSChatConnections(dynamoClient, SLS_CHAT_CONNECTIONS);
    const endpoint = apiGatewayEndpoint(event);
    const apiGateway = createAPIGatewayManagement(endpoint);
    const postData = JSON.parse(event.body).data;
    const connections = await dao.all();
    await Promise.all(connections.map(v => apiGateway.postToConnection({
      ConnectionId: v.connectionId,
      Data: postData
    }).promise()));
    return {statusCode: 200, body: 'message sent'};
  } catch(err) {
    console.error(err);
    return {statusCode: 500, body: 'send message error'};
  }
}