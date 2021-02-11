
## dev
`docker-compose -f docker-compose.development.yml up`

ボリューム込のコンテナ削除
`docker-compose -f docker-compose.development.yml down -v`

- functionsとかにデプロイするときは、package.jsonのmainをindex.jsにする必要がある

