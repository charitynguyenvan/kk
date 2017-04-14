import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import chatApp from '../../reducers/demo'
import ChatApp from './ChatApp'

import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'

function optimisticExecute(action, emit, next, dispatch) {
  emit('ANY_NAME', action)
}
let socket = io('http://localhost:3000');
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/", { execute: optimisticExecute });
let store = applyMiddleware(socketIoMiddleware)(createStore)(chatApp);


class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {ok: false};

    // This binding is necessary to make `this` work in the callback
    // this.handleClick = this.handleClick.bind(this);
  }
  render(){
    let username, password
    return this.state.ok ? (<Provider store={store}>
      <ChatApp />
    </Provider>) : (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          fetch('http://localhost:3000/testpost', {
            headers: {
              "Content-Type": "application/json"
            },
            method: 'POST',
            // body: JSON.stringify({
            //   "username": username.value,
            //   "password": password.value
            // })
          })
          .then((res) => {
            this.setState({ok: true})
            console.log(res.body);
          });
          // username.value = ''
          // password.value = ''
        }}>
          <input ref={node => {
            username = node
          }} />
          <br/>
          <input ref={node => {
            password = node
          }} />
          <br/>
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    )
  }
}

render(
  <Login />,
  document.getElementById('root')
)
