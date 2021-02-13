import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
// import { getConnectionOptions, createConnection, BaseEntity } from 'typeorm'
import bodyParser from 'body-parser'
require('dotenv').config();

const { Pool, Client } = require('pg')
// const connectionString = 'postgres://postgres:postgres@db:5432/postgres'
// const pool = new Pool({
  // connectionString: connectionString,
// })
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
})
pool.query('SELECT NOW()', (err: any, res: any) => {
  console.log(err, res)
  pool.end()
})


const app = async () => {
  const app = express()

  // const connectionOptions = await getConnectionOptions()

  // const connection = await createConnection(connectionOptions)

  app.use(helmet())
  app.use(cors())


  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  const port = process.env.PORT || 3000

  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello World' })
  })

  app.get('/users', (req, res) => {
    res.status(200).send({ message: '-------------- Hello Userssss!!!!!!!!!!!!!!!🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉 --------------' })
  })

  app.get('/test', (req, res) => {
    res.status(200).send({ message: '🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵🍵' })
  })
  console.log('listen on port' + port)
  app.listen(port)
}
app()
  .then(() => {

  })
  .catch((e) => {
    console.log(e);
  })
