// @flow

import type {Response} from './response';
import {DynamoDB} from 'aws-sdk';

const dbClient = new DynamoDB.DocumentClient({
  apiVersion: '2012-08-10', region: process.env.AWS_REGION
});

export async function connect(event: any): Promise<Response> {
  try {
    console.log('connection');
    const TableName = process.env.SLS_CHAT_CONNECTIONS;
    const Item = {connectionId: event.requestContext.connectionId};
    console.log(Item);
    await dbClient.put({TableName, Item}).promise();
    console.log('connection success');
    return {statusCode: 200, body: 'Connected.'};
  } catch(err) {
    console.error(err);
    const body = `Failed to connect: ${JSON.stringify(err)}`;
    return { statusCode: 500, body};
  }
}