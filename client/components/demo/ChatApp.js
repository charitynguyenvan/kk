import React from 'react'
import Footer from './Footer'
import SendMessage from '../../containers/demo/SendMessage'
import VisibleMessageList from '../../containers/demo/VisibleMessageList'

const ChatApp = () => (
  <div>
    <Footer />
    <VisibleMessageList />
    <SendMessage />
  </div>
)

export default ChatApp
