import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
require('dotenv').config();

const { Pool } = require('pg')
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
})


const app = async () => {
  const app = express()

  app.use(helmet())
  app.use(cors())


  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  const port = process.env.PORT || 3000

  app.get('/', async (req, res) => {
    const client = await pool.connect()
    const dbRes = await client.query('SELECT NOW()', (err: any, res: any) => {
      console.log(err, res)
      client.release()
    })
    res.status(200).send({ message: 'Hello World', db: dbRes })
  })

  app.get('/users', async (req, res) => {
    const client = await pool.connect()
    const dbRes = await client.query('SELECT * FROM users')
    client.release()
    res.status(200).send({ message: '-------------- Hello Userssss!!!!!!!!!!!!!!!🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉 --------------' , users: dbRes.rows})
  })

  app.get('/add-users', async (req, res) => {
    const client = await pool.connect()
    const user_id = Math.random()
    const name = Math.random()
    const dbRes = await client.query(`INSERT INTO users (user_id, name) VALUES (${user_id}, ${name});`)
    client.release()
    res.status(200).send({ message: '-------------- Hello Userssss!!!!!!!!!!!!!!!🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉 --------------' , users: dbRes.rows})
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
