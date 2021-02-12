
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
