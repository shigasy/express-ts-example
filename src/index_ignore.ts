import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
const app = express()

const { Pool, Client } = require('pg')
const connectionString = 'postgres://postgres:postgres@db:5432/postgres'
const pool = new Pool({
  connectionString: connectionString,
})
pool.query('SELECT NOW()', (err: any, res: any) => {
  console.log(err, res)
  pool.end()
})


app.use(helmet())
app.use(cors())

import bodyParser from 'body-parser'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello World' })
})

app.get('/users',(req, res) =>
{
    const client = new Client({
        connectionString: connectionString,
      })
      client.connect()
      client.query('SELECT * FROM users', (err: any, result: any) => {
        res.send(result.rows)
        client.end()
    })
});

app.listen(port)
console.log('listen on port' + port)
