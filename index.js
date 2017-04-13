import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import chatApp from './client/reducers/demo'
import ChatApp from './client/components/demo/ChatApp'

import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'

function optimisticExecute(action, emit, next, dispatch) {
  emit('ANY_NAME', action)
}
let socket = io('http://10.22.164.69:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/", { execute: optimisticExecute });
let store = applyMiddleware(socketIoMiddleware)(createStore)(chatApp);

render(
  <Provider store={store}>
    <ChatApp />
  </Provider>,
  document.getElementById('root')
)
