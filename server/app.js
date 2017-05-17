import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import init from './socketio'
import { getPath } from './common/helper'
import allRoutes from './routes'

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/static', express.static(getPath(__dirname)('../client/dist')))

// load all routes
for(let link in allRoutes){

  let allMethods = allRoutes[link]
  for(let requestMethod in allMethods){

    let handler = allMethods[requestMethod]
    let method = require('./controllers/' + handler.controller)[handler.method]

    app[requestMethod](link, handler.middleware || [], method())
  }
}

app.get('/table', (req, res) => {
  res.sendFile(getPath(__dirname)('../client/dist/index-table.html'))
})

app.get('/upload', (req, res) => {
  res.sendFile(getPath(__dirname)('../client/dist/index-upload.html'))
})
// 
// app.get('/geturl', (req, res) => {
//   AWS.config.update({region: 'ap-southeast-1'})
//   const s3 = new AWS.S3()
//   const params = {Bucket: 'kajkai-avatar', Key: 'liuyifei2.jpg', Expires: 300}
//   const url = s3.getSignedUrl('putObject', params)
//   res.send({url})
// })

export default app
