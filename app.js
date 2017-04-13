var express = require('express')
var app = express()
var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  })
app.use(session)
var server = require('http').Server(app)
var cookieParser = require('cookie-parser')
var sio = require('./server/socketio').init(server, session)



server.listen(3000)


app.use(cookieParser())
app.use(express.static(__dirname))

app.post('/testpost', (req, res) => {
  res.sendFile(__dirname + '/index.html')
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
