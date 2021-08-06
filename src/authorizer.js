// @flow

import type {AuthorizerResponse} from "./lambda/authorizer-response";
import {successAuthorize} from "./lambda/authorizer-response";
import type {AuthorizerEvent} from "./lambda/event";

/**
 * オーサライザ
 *
 * @param event イベント
 * @return 認可結果
 */
export async function authorizer(event: AuthorizerEvent): Promise<AuthorizerResponse> {
  const principalId = 'test';
  const resource: string = event.methodArn;
  return successAuthorize(principalId, resource);
}