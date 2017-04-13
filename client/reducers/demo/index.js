import { combineReducers } from 'redux'
import messages from './messages'
import visibilityFilter from './visibilityFilter'

const chatApp = combineReducers({
  messages,
  visibilityFilter
})

export default chatApp
