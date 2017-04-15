import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import chatApp from './client/reducers/demo'
import ChatAppContainer from './client/containers/demo/ChatAppContainer'
import thunkMiddleware from 'redux-thunk'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'

function optimisticExecute(action, emit, next, dispatch) {
  emit('ANY_NAME', action)
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

let socket = io('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/", { execute: optimisticExecute });
// let store = applyMiddleware(socketIoMiddleware)(createStore)(chatApp);
const store = createStore(
  chatApp,
  preloadedState,
  applyMiddleware(
    socketIoMiddleware,
    thunkMiddleware
  )
)

render(
  <Provider store={store}>
    <ChatAppContainer />
  </Provider>,
  document.getElementById('root')
)
