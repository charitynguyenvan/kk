import socketIo from 'socket.io'
import allEvents from './events'
import { validateTokenDemo } from '../services/DemoService'
// import sharedsession from 'express-socket.io-session'

const init = (server) => {
  const sio = socketIo(server)
  // sio.use(sharedsession(session))
  sio.on('connection', (socket) => {
    console.log('a user connected')
    // console.log(socket.handshake.session)
    // console.log(socket.handshake.cookies)
    socket.on('disconnect', () => {
      console.log('a user disconnected')
    })
    //
    // load all events
    for(let e in allEvents){

      let handler = allEvents[e]
      let method = require('../controllers/' + handler.controller)[handler.method]
      socket.on(e, (action) => {
        if(validateTokenDemo(action.token)) {
          method(action, sio)
        } else {
          socket.emit('action', {
            type: 'NOT_LOGGED_IN'
          })
        }
      })
    }
  })
  return sio
}

export default init
