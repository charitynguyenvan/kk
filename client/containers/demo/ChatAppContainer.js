import { connect } from 'react-redux'
import ChatApp from '../../components/demo/ChatApp'

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const ChatAppContainer = connect(
  mapStateToProps,
)(ChatApp)

export default ChatAppContainer
