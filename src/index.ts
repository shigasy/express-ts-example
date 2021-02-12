import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { getConnectionOptions, createConnection, BaseEntity } from 'typeorm'
import bodyParser from 'body-parser'

let app = async () => {
  const app = express()

  const connectionOptions = await getConnectionOptions()

  const connection = await createConnection(connectionOptions)

  app.use(helmet())
  app.use(cors())


  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  const port = process.env.PORT || 3000

  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello World' })
  })

  app.get('/users', (req, res) => {
    res.status(200).send({ message: '-------------- Hello Users! --------------' })
  })
}
app()
  .then(() => {

  })
  .catch((error) => {
    console.log(error)
  })

module.exports = {
  app
};
