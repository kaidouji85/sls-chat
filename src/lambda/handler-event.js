// @flow

/** AWS Lambda HandlerEvent */
export type HandlerEvent = {
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