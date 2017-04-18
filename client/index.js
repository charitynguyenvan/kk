import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { loginResult } from './actions/demo'
import chatApp from './reducers/demo'
import ChatAppContainer from './containers/demo/ChatAppContainer'

import thunkMiddleware from 'redux-thunk'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import cookie from 'react-cookie'

import config from '../config'

import logger from 'redux-logger'

function execute(action, emit, next, dispatch) {
  if(cookie.load('token') !== undefined){
    emit('DEMO_EVENT', {...action, token: cookie.load('token')})
  }else{
    dispatch(loginResult('NOT_LOGGED_IN'))
  }
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

let socket = io(config.getDomain());
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/", { execute: execute });

const store = createStore(
  chatApp,
  preloadedState,
  applyMiddleware(
    logger,
    socketIoMiddleware,
    thunkMiddleware
  )
)

console.log('hint: username === password');

render(
  <Provider store={store}>
    <ChatAppContainer />
  </Provider>,
  document.getElementById('root')
)
