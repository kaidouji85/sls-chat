// @flow

/** リクエスト コンテクスト */
export type RequestContext = {
  connectionId: string,
  domainName: string,
  stage: string
};

/** クエリパラメータをセットしたオブジェクト */
export type QueryStringParameters = {
  /** トークン */
  token: string
}

/** オーサライザのイベント */
export type AuthorizerEvent = {
  /**
   * オーサライザに渡されるmethodArn
   * 詳細は以下URLを参照
   * https://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/api-gateway-lambda-authorizer-input.html
   */
  methodArn: string,
  /** リクエストパラメータ */
  queryStringParameters: QueryStringParameters,
  /** リクエスト コンテクスト */
  requestContext: RequestContext,
};

/** ハンドラのイベント */
export type HandlerEvent = {
  /** リクエストボディ */
  body: string,
  /** リクエスト コンテクスト */
  requestContext: RequestContext
};