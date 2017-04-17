import chatApp from '../../../client/reducers/demo'
import ChatAppContainer from '../../../client/containers/demo/ChatAppContainer'

import { renderInitialState } from '../helper'

import { validateTokenDemo } from '../../services/DemoService'

const auth = () => {
  return (req, res, next) => {

    if(validateTokenDemo(req.cookies.token)){
      next()
    }else{
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
}

export default auth
