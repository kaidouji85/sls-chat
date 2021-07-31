// @flow

import type {Response} from './respponse/response';
import {createDynamoDBClient} from "./dynamo-db/client";

/** DynamoDBクライアント */
const dbClient = createDynamoDBClient();

/**
 * $connect エントリポイント
 *
 * @param event イベント
 * @return レスポンス
 */
export async function connect(event: any): Promise<Response> {
  try {
    const TableName = process.env.SLS_CHAT_CONNECTIONS;
    const Item = {connectionId: event.requestContext.connectionId};
    await dbClient.put({TableName, Item}).promise();
    return {statusCode: 200, body: 'connected.'};
  } catch(err) {
    console.error(err);
    const body = 'connection error';
    return {statusCode: 500, body};
  }
}