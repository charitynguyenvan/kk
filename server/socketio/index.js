var self = module.exports = {
  init: (server, session) => {
    var sio = require('socket.io')(server)
    var sharedsession = require("express-socket.io-session")
    sio.use(sharedsession(session))
    sio.on('connection', (socket) => {
      console.log('a user connected')
      // console.log(socket.handshake)
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
}
