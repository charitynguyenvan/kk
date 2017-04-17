import socketIo from 'socket.io'
import sharedsession from 'express-socket.io-session'

const init = (server, session) => {
  const sio = socketIo(server)
  sio.use(sharedsession(session))
  sio.on('connection', (socket) => {
    console.log('a user connected')
    console.log(socket.handshake)
    socket.on('disconnect', () => {
      console.log('a user disconnected')
    })
    socket.on('ANY_NAME', (action) => {
      if(action.type === 'server/SEND_MESSAGE'){
        console.log('Got data!', action.message);
        sio.emit('action', {
          type: 'SEND_MESSAGE',
          message: action.message,
          author: 'CHARITY',
          id: Date.now()
        });
      }
    })
  })
  return sio;
}

export default init
