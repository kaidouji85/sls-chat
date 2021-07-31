// @flow

import type {Response} from './response';

export async function connect(event: any): Promise<Response> {
  console.log('connect', event);
  return {statusCode: 200, body: 'test'};
}