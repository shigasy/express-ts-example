
## dev
`docker-compose -f docker-compose.development.yml up`

ボリューム込のコンテナ削除
`docker-compose -f docker-compose.development.yml down -v`

- functionsとかに手動デプロイするときは、package.jsonのmainをindex.jsにする必要がある

## GCPにfunctionsデプロイ
`gcloud functions deploy app --runtime nodejs12 --trigger-http --allow-unauthenticated`
gcloud系インストールする必要ある
.gcloudignoreでdistを含めるようにするとpackage.jsonを見て動いてくれる


## Docker Composeのネットワーク
AppコンテナからTypeORMでDBコンテナに接続しようとした時に、localhostで接続できなかった。
ipアドレスとコンテナ名の名前解決してあげる必要がありそう。

> Docker Composeは、プロジェクト単位で内部通信用のブリッジ・ネットワークを持ち、IPアドレスとコンテナ名の名前解決が可能になっています。

## Dockerfile使ったdocker-composeの起動
下記のように、中間コンテナが消されているので、Dockerfile内でnodeのサーバーが建てられても消える。docker-composeでもサーバーは起動するので、どうしようかと思った。
Dockerfile内のCMDは実行されるため、COPYとかその他実行したいことがあったら実行できる。
```
Step 6/6 : CMD [ "node", "./dist/index.js" ]
 ---> Running in 2253605be8e8
Removing intermediate container 2253605be8e8
 ---> 41f002d89dd6
```

## beta版 1発デプロイ
https://cloud.google.com/blog/ja/products/serverless/build-and-deploy-an-app-to-cloud-run-with-a-single-command
Dockerfileなくても、いい感じにDockerfile書いてくれてCloud Runにデプロイしてくれる
Dockerfileあったら、それ参考にbuildしてデプロイしてくれる

```
gcloud beta run deploy --source=[DIRECTORY]
```

## メモ
dist/index.jsが実行されているから、
再度imageをbuildして、cloud runにデプロイしなければならない

今はローカルでやっているが、
Cloud BuildなどでCI/CDしたほうがいい

GitHubデプロイ後、Cloud Buildでビルドしてコンテナイメージを保存し、Cloud Runにデプロイ
Cloud BuildでTypeScriptをbuildしたり、migrationしたりする。
## env Cloud SQLにつなぐ方法

環境変数をCloud Runに設定（Google Cloud の secret managerとか使ったほうが良さそう）
接続で、Cloud SQLに接続でインスタンスを設定すると、自動的に管理アカウントでの接続が可能になる

開発環境では、.envにdockerのDBを記入する

## 手順

### 開発環境
1. npm install
2. .envにする。中身変更の必要あれば変更する。現状はdocker-composeのDBの設定。
3. docker-compose -f docker-compose.development.yml up

### 本番デプロイ
この辺のデプロイはCI/CD使いたい
#### cloud run
1. cloud runはGCPでcloud runやGCPの設定
2. gcloudをインストール
3. npm run deploy

#### gae
1. secret.copy,yamlをsecret.yamlにして環境変数入れる
2. GCPでGAEのAPIとかを許可
3. gcloudをインストール
4. gcloud app deploy

### 本番DB接続
gcloud sql connect myinstance --user=postgres
