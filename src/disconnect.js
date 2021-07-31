// @flow

import type {Response} from './respponse/response';
import {createDynamoDBClient} from "./dynamo-db/client";
import {SLSChatConnections} from "./dynamo-db/sls-chat-cpnnections";

const awsRegion = process.env.AWS_REGION ?? '';
const slsChatConnectionTable = process.env.SLS_CHAT_CONNECTIONS ?? '';
const dynamoClient = createDynamoDBClient(awsRegion);

/**
 * $disconnect エントリポイント
 *
 * @param event イベント
 * @return レスポンス
 */
export async function disconnect(event: any): Promise<Response> {
  try {
    const connections = new SLSChatConnections(dynamoClient, slsChatConnectionTable);
    const connectionId = event.requestContext.connectionId;
    await connections.delete(connectionId);
    return {statusCode: 200, body: 'disconnected'};
  } catch(err) {
    console.error(err);
    return {statusCode: 500, body: 'disconnect error'};
  }
}