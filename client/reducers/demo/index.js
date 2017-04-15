import { combineReducers } from 'redux'
import login from './login'
import messages from './messages'
import visibilityFilter from './visibilityFilter'

const chatApp = combineReducers({
  login,
  messages,
  visibilityFilter
})

export default chatApp
