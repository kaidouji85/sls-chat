// @flow

import type {AuthorizerResponse} from "./lambda/authorizer-response";
import {successAuthorize} from "./lambda/authorizer-response";

/**
 * オーサライザ
 *
 * @param event イベント
 * @return 認可結果
 */
export async function authorizer(event: any): Promise<AuthorizerResponse> {
  const principalId = 'test';
  const resource: string = event.methodArn;
  return successAuthorize(principalId, resource);
}