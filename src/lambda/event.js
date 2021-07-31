// @flow

/** AWS Lambda Event */
export type Event = {
  /** リクエストボディ */
  body: string,
  /** リクエストコンテクスト */
  requestContext: RequestContext
};

/** リクエストコンテクスト */
export type RequestContext = {
  connectionId: string,
  domainName: string,
  stage: string
};