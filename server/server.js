import app from './app'
import http from 'http'
import expressSession from 'express-session'
import init from './socketio'

// let session = expressSession({
//     secret: "my-secret",
//     resave: true,
//     saveUninitialized: true
//   })
// app.use(session)

const server = http.Server(app)
const sio = init(server, app.session)

server.listen(3000)
