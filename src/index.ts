import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
const app = express()

app.use(helmet())
app.use(cors())

import bodyParser from 'body-parser'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello World' })
})

app.get('/users', (req, res) => {
  res.status(200).send({ message: '-------------- Hello Users! --------------' })
})

app.listen(port)
console.log('listen on port' + port)
