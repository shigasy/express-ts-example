
## dev
`docker-compose -f docker-compose.development.yml up`

ボリューム込のコンテナ削除
`docker-compose -f docker-compose.development.yml down -v`

- functionsとかに手動デプロイするときは、package.jsonのmainをindex.jsにする必要がある

## GCPにfunctionsデプロイ
`gcloud functions deploy app --runtime nodejs12 --trigger-http --allow-unauthenticated`
gcloud系インストールする必要ある
.gcloudignoreでdistを含めるようにするとpackage.jsonを見て動いてくれる