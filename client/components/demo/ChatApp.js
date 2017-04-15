import React from 'react'
import Footer from './Footer'
import SendMessage from '../../containers/demo/SendMessage'
import VisibleMessageList from '../../containers/demo/VisibleMessageList'
import Login from '../../containers/demo/Login'

const ChatApp = ({ login }) => (
  login.type === 'LOG_IN_SUCCESS' ?
  <div>
    <Footer />
    <VisibleMessageList />
    <SendMessage />
  </div>
  : (
    login.type === 'LOGGING_IN' ?
    <div>
      logging to ... {login.username}
    </div>
    : <Login />
  )
)

export default ChatApp
