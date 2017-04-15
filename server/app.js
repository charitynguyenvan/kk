

import path from 'path'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import chatApp from '../client/reducers/demo'
import ChatAppContainer from '../client/containers/demo/ChatAppContainer'
import { renderToString } from 'react-dom/server'
import express from 'express'
import bodyParser from 'body-parser'

// var path = require('path')
// var React = require('react')
// let { createStore } = require('redux')
// let { Provider } = require('react-redux')
// let chatApp = require('../client/reducers/demo')
// let ChatAppContainer = require('../client/containers/demo/ChatAppContainer')
// let  { renderToString } = require('react-dom/server')
// var express = require('express')
// var bodyParser = require('body-parser')

var app = express()

var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  })
app.use(session)
var server = require('http').Server(app)
var cookieParser = require('cookie-parser')
var sio = require('./socketio').init(server, session)

server.listen(3000)
const getPath = (root) => {
  return (relative) => {
    return path.resolve(root, relative)
  }
}
const getPathFromDir = getPath(__dirname)

const renderFullPage = (html, preloadedState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/static/demo.js"></script>
      </body>
    </html>
    `
}

app.use(cookieParser())
app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/static', express.static(getPathFromDir('../client/dist')))


app.use((req, res, next) => {
  if(req.cookies.token === undefined){
    console.log('fshkfhsfls');
    // Compile an initial state
    let preloadedState = {
      login: {
        type: 'NOT_LOGGED_IN'
        // type: 'LOG_IN_SUCCESS'
      }
    }

    // Create a new Redux store instance
    const store = createStore(chatApp, preloadedState)


    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <ChatAppContainer />
      </Provider>
    )


    // Grab the initial state from our Redux store
    const finalState = store.getState()


// res.end("dad")
    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState))
  }else{

  }

    console.log("req.body", req.body)
    console.log("req.cookies.token", req.cookies.token)
  //   res.cookie('token', Math.random(), { maxAge: 10000}
  // }else{
  //   res.sendFile(getPathFromDir('../client/dist/index.html'))
    // next()
  // }
})
app.get('/demo', (req, res) => {
  res.sendFile(getPathFromDir('../client/dist/index.html'))
})

app.post('/demo', (req, res) => {
  console.log("post ok");
  setTimeout(() => {
       res.end(' World');
   }, 2000)
})


app.post('/testpost', (req, res) => {
  console.log("req.body", req.body);
  res.end("kdkd")
  res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="./static/bundle.js"></script>
      </body>
    </html>`
  )
  // res.sendFile(__dirname + '/index.html')
})

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

// let allRoutes = require('./routes')
// let allLinks = Object.getOwnPropertyNames(allRoutes)
// allLinks.forEach((link) => {
//   let requestMethodType = Object.getOwnPropertyNames(allRoutes[link])[0]
//   let controller = allRoutes[link][requestMethodType].controller
//   let middleware = allRoutes[link][requestMethodType].middleware
//   let controllerMethod = allRoutes[link][requestMethodType].method
//
//   app[requestMethodType](link, (req, res) => {
//     res.sendFile('../client/index.html')
//   })
//   console.log(temLink, link, requestMethodType, controller, controllerMethod)
// })
