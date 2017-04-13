import React from 'react'
import PropTypes from 'prop-types'
import Message from './Message'

const MessageList = ({ messages, onMessageClick }) => (
  <ul>
    {messages.map(message =>
      <Message
        key={message.id}
        {...message}
        onClick = {() => onMessageClick(message.id)}
      />
    )}
  </ul>
)

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    toggled: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onMessageClick: PropTypes.func.isRequired
}

export default MessageList
