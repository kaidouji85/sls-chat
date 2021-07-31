// @flow

import {DynamoDB} from "aws-sdk";

/**
 * DynamoDBクライアントを生成する
 *
 * @return DynamoDBクライアント
 */
export function createDynamoDBClient(): typeof DynamoDB.DocumentClient {
  return new DynamoDB.DocumentClient({
    apiVersion: '2012-08-10', region: process.env.AWS_REGION
  });
}