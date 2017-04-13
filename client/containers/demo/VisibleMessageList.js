import { connect } from 'react-redux'
import MessageList from '../../components/demo/MessageList'
import { toggleMessage } from '../../actions/demo'

const getVisibleMessages = (messages, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return messages
    case 'SHOW_ACTIVE':
      return messages.filter(m => !m.toggled)
    case 'SHOW_TOGGLED':
      return messages.filter(m => m.toggled)
  }
}

const mapStateToProps = (state) => {
  return {
    messages: getVisibleMessages(state.messages, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMessageClick: (id) => {
      dispatch(toggleMessage(id))
    }
  }
}

const VisibleMessageList = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList)

export default VisibleMessageList
