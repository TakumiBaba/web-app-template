import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import requireDir from 'require-dir'

const debug = require('debug')('babascript:platform:app')
const controllers = requireDir('./controllers')
const models = requireDir('./models')

const app = express()
const PORT = process.env.PORT || 4567

app.use(morgan())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

Object.keys(controllers).forEach((k) => { controllers[k](app) })
Object.keys(models).forEach((k) => { models[k](app) })

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017'
mongoose.connect(mongoUrl)

mongoose.connection.on('connected', () => {
  const server = app.listen(PORT, () => {
    const host = server.address().address
    const port = server.address().port
    debug(`listen http://${host}:${port}`)
  })
})
