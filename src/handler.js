// @flow

import type {Response} from './respponse/response';
import {createDynamoDBClient} from "./dynamo-db/client";
import {SLSChatConnections} from "./dynamo-db/sls-chat-cpnnections";

const AWS_REGION = process.env.AWS_REGION ?? '';
const SLS_CHAT_CONNECTIONS = process.env.SLS_CHAT_CONNECTIONS ?? '';
const dynamoClient = createDynamoDBClient(AWS_REGION);

/**
 * $connect エントリポイント
 *
 * @param event イベント
 * @return レスポンス
 */
export async function connect(event: any): Promise<Response> {
  try {
    const connections = new SLSChatConnections(dynamoClient, SLS_CHAT_CONNECTIONS);
    const connection = {connectionId: event.requestContext.connectionId}
    await connections.put(connection);
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
export async function disconnect(event: any): Promise<Response> {
  try {
    const connections = new SLSChatConnections(dynamoClient, SLS_CHAT_CONNECTIONS);
    const connectionId = event.requestContext.connectionId;
    await connections.delete(connectionId);
    return {statusCode: 200, body: 'disconnected'};
  } catch(err) {
    console.error(err);
    return {statusCode: 500, body: 'disconnect error'};
  }
}