import { getPath, renderInitialState } from '../common/helper'

import { login } from '../services/DemoService'

const getAbsolutePath = getPath(__dirname)

export const getDemo = () => {
  return (req, res) => {
    // Compile an initial state
    let preloadedState = {
      login: {
        type: 'NOT_LOGGED_IN'
        // type: 'LOG_IN_SUCCESS'
      }
    }

    // Send the rendered page back to the client
    res.send(renderInitialState(preloadedState, chatApp, ChatAppContainer))
  }
}

export const postDemo = () => {
  return (req, res) => {
    let {username, password} = req.body
    console.log(username, password);
    if (login(username, password)) {
      res.cookie('token', Math.random(), { maxAge: 10000})
      res.send({
        login: 'LOG_IN_SUCCESS'
      })
    } else {

    }
  }
}
