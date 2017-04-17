import express from 'express'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import bodyParser from 'body-parser'
import path from 'path'

import init from './socketio'
import { getPath } from './common/helper'
import allRoutes from './routes'

const getAbsolutePath = getPath(__dirname)

const app = express()
let session = expressSession({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  })
app.session = session

app.use(session)
app.use(cookieParser())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/static', express.static(getAbsolutePath('../client/dist')))

for(let link in allRoutes){

  let allMethods = allRoutes[link]
  for(let requestMethod in allMethods){

    let handler = allMethods[requestMethod]
    let method = require('./controllers/' + handler.controller)[handler.method];

    app[requestMethod](link, handler.middleware || [], method())
  }

}

// app.use('/demo', (req, res, next) => {
//   console.log(req.body);
//   if(req.cookies.token === undefined){
//     // Compile an initial state
//     let preloadedState = {
//       login: {
//         type: 'NOT_LOGGED_IN'
//         // type: 'LOG_IN_SUCCESS'
//       }
//     }
//
//     // Send the rendered page back to the client
//     res.send(renderInitialState(preloadedState, chatApp, ChatAppContainer))
//   }else{
//
//   }
//
//     console.log("req.body", req.body)
//     console.log("req.cookies.token", req.cookies.token)
//   //   res.cookie('token', Math.random(), { maxAge: 10000}
//   // }else{
//   //   res.sendFile(getPathFromDir('../client/dist/index.html'))
//     // next()
//   // }
// })
// app.get('/demo', (req, res) => {
//   res.sendFile(getAbsolutePath('../client/dist/index.html'))
// })
//
// app.post('/demo', (req, res) => {
//   console.log("post ok");
//   setTimeout(() => {
//        res.end(' World');
//    }, 5000)
// })


// app.post('/testpost', (req, res) => {
//   console.log("req.body", req.body);
//   res.end("kdkd")
//   // res.sendFile(__dirname + '/index.html')
// })

// app.use((req, res, next) => {
//   console.log('cookie yyy', req.cookies)
//   if(req.cookies.test !== undefined){
//       res.sendFile(__dirname + '/index.html')
//   }else{
//
//     next();
//   }
// });
//
// app.get('/demo', (req, res) => {
//   console.log('cookie xxx', req.cookies)
//   res.cookie('test', Math.random(), { maxAge: 10000})
//   res.send('SET COOKIE')
// })


export default app
