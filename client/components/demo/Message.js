import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ onClick, toggled, author, message }) => (
  <div
    onClick={onClick}
    style={{
      textDecoration: toggled ? 'line-through' : 'none'
    }}
  >
    {author} {": "}  {message}
  </div>
)

Message.propTypes = {
  onClick: PropTypes.func.isRequired,
  toggled: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired

}

export default Message
