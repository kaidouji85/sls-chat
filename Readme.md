# severless チャット習作

## はじめに
serverless frameworkでチャットシステムを作りました。
以下を参考にして、プログラムを組みました。

API Gateway の WebsocketAPI を Serverless で実装してみる  
https://www.nightswinger.dev/2020/05/websocketapi-in-apigateway/

## 前提条件
### 必須ソフト
以下ソフトウェアがインストールされていること

* node.js
* npm
* serverless cli

### AWS認証設定
serverless cliのAWS認証が完了していること

https://www.serverless.com/framework/docs/providers/aws/guide/credentials/

## セットアップ

```shell
cd <本リポジトリをcloneした場所>
npm ci
```

## デプロイ

```shell
cd <本リポジトリをcloneした場所>
sls deploy
```

## 動作確認

```shell
npm install -g wscat
wscat -c <Websocket URL>
{"action":"sendmessage", "data":"hello world"}
```