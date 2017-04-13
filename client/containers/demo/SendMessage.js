import React from 'react'
import { connect } from 'react-redux'
import { sendMessage } from '../../actions/demo'

let SendMessage = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(sendMessage(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          SEND
        </button>
      </form>
    </div>
  )
}
SendMessage = connect()(SendMessage)

export default SendMessage
