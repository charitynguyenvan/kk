import chatApp from '../../client/reducers/demo'
import ChatAppContainer from '../../client/containers/demo/ChatAppContainer'

import { getPath, renderInitialState } from '../common/helper'
import { login, generateTokenDemo } from '../services/DemoService'

const getAbsolutePath = getPath(__dirname)

export const getDemo = () => {
  return (req, res) => {
    // Compile an initial state
    let preloadedState = {
      login: {
        // type: 'NOT_LOGGED_IN'
        type: 'LOG_IN_SUCCESS'
      }
    }

    // Send the rendered page back to the client
    res.send(renderInitialState(preloadedState, chatApp, ChatAppContainer))
  }
}

export const postDemo = () => {
  return (req, res) => {
    console.log('cookies', req.cookies);
    let {username, password} = req.body
    console.log(username, password);
    if (login(username, password)) {

      res.cookie('token', generateTokenDemo(username), { maxAge: 10000})

      setTimeout(() => {
        res.send({
          type: 'LOG_IN_SUCCESS'
          // type: 'LOG_IN_FAILURE'
        })
      }, 1000)

    } else {

      setTimeout(() => {
        res.send({
          // type: 'LOG_IN_SUCCESS'
          type: 'LOG_IN_FAILURE'
        })
      }, 1000)
    }
  }
}
