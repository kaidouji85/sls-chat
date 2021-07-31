// @flow

import type {Response} from './respponse/response';
import {createDynamoDBClient} from "./dynamo-db/client";
import {SLSChatConnections} from "./dynamo-db/sls-chat-cpnnections";

const awsRegion = process.env.AWS_REGION ?? '';
const slsChatConnectionTable = process.env.SLS_CHAT_CONNECTIONS ?? '';
const dynamoClient = createDynamoDBClient(awsRegion);

/**
 * $connect エントリポイント
 *
 * @param event イベント
 * @return レスポンス
 */
export async function connect(event: any): Promise<Response> {
  try {
    const connections = new SLSChatConnections(dynamoClient, slsChatConnectionTable);
    const connection = {connectionId: event.requestContext.connectionId}
    await connections.put(connection);
    return {statusCode: 200, body: 'connected.'};
  } catch(err) {
    console.error(err);
    return {statusCode: 500, body: 'connection error'};
  }
}