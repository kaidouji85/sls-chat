// @flow

import type {AuthorizerResponse} from "./lambda/authorizer-response";
import {successAuthorize} from "./lambda/authorizer-response";
import type {AuthorizerEvent} from "./lambda/event";
import {verifyAccessToken} from "./auth0/access-token";

const AUTH0_JWKS_URL = process.env.AUTH0_JWKS_URL || '';
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || '';

/**
 * オーサライザ
 *
 * @param event イベント
 * @return 認可結果
 */
export async function authorizer(event: AuthorizerEvent): Promise<AuthorizerResponse> {
  console.log('authorizer');
  const token = await verifyAccessToken(event.queryStringParameters.token, AUTH0_JWKS_URL, AUTH0_AUDIENCE);
  console.log(token);
  const principalId = 'test';
  const resource: string = event.methodArn;
  return successAuthorize(principalId, resource);
}