// @flow

import type {Response} from './respponse/response';
import {createDynamoDBClient} from "./dynamo-db/client";

/** DynamoDBクライアント */
const dynamoClient = createDynamoDBClient();

/**
 * $disconnect エントリポイント
 *
 * @param event イベント
 * @return レスポンス
 */
export async function disconnect(event: any): Promise<Response> {
  try {
    const TableName = process.env.SLS_CHAT_CONNECTIONS;
    const Key = {
      connectionId: event.requestContext.connectionId
    };
    await dynamoClient.delete({TableName, Key}).promise();
    return {statusCode: 200, body: 'disconnected'};
  } catch(err) {
    console.error(err);
    const body = 'disconnect error';
    return {statusCode: 500, body};
  }
}