import express from 'express'
import cookieParser from 'cookie-parser'
// import expressSession from 'express-session'
import bodyParser from 'body-parser'
import path from 'path'

import init from './socketio'
import { getPath } from './common/helper'
import allRoutes from './routes'

const getAbsolutePath = getPath(__dirname)

const app = express()
// let session = expressSession({
//     secret: "my-secret",
//     resave: true,
//     saveUninitialized: true
//   })
// app.session = session
//
// app.use(session)
app.use(cookieParser())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/static', express.static(getAbsolutePath('../client/dist')))

// app.get('/', (req, res) => {
//   console.log('cookies', req.cookies);
//   res.cookie('test', Math.random(), { maxAge: 10000})
//   res.send('SET COOKIE')
// })

// load all routes
for(let link in allRoutes){

  let allMethods = allRoutes[link]
  for(let requestMethod in allMethods){

    let handler = allMethods[requestMethod]
    let method = require('./controllers/' + handler.controller)[handler.method];

    app[requestMethod](link, handler.middleware || [], method())
  }

}

export default app
