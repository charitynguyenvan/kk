import React from 'react'
import { connect } from 'react-redux'
import { logIn } from '../../actions/demo'

let Login = ({ dispatch }) => {
  let username, password
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        console.log('click ok');
        dispatch(logIn(username.value, password.value))

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
          LOG IN
        </button>
      </form>
    </div>
  )
}

Login = connect()(Login)

export default Login
