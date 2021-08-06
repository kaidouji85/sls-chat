// @flow

/** 許可、拒否 */
export type Effect = 'Allow' | 'Deny';

/** ポリシードキュメントのステートメント */
export type Statement = {
  Action: "execute-api:Invoke",
  /** 効果 */
  Effect: Effect,
  /** リソース */
  Resource: string
};

/** ポリシードキュメント */
export type PolicyDocument = {
  Version: '2012-10-17',
  /** ステートメント */
  Statement: Statement[]
};

/** オーサライザが返すデータ */
export type AuthorizerResponse = {
  /** プリンシパルID */
  principalId: string,
  /** ポリシードキュメント */
  policyDocument: PolicyDocument
};

/**
 * 認可成功時のレスポンス
 *
 * @param principalId プリンシパルID
 * @param resource リソース
 * @return レスポンス
 */
export function successAuthorize(principalId: string, resource: string): AuthorizerResponse {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: "execute-api:Invoke",
        Effect: 'Allow',
        Resource: resource
      }]
    }
  };
}