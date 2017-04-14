var express = require('express')
var app = express()
var bodyParser = require('body-parser')
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
app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded




app.use('/static', express.static(__dirname))


app.get('/demo', (req, res) => {

  res.sendFile(__dirname + '/dist/index.html')
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
