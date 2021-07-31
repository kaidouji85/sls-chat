// @flow

import type {Event} from '../lambda/event';

/**
 * eventからAPIゲートウェイのエンドポイントを生成する
 *
 * @param event イベント
 * @return APIゲートウェイのエンドポイント
 */
export function apiGatewayEndpoint(event: Event): string {
  return `${event.requestContext.domainName}/${event.requestContext.stage}`;
}