const message = (state = {}, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      console.log(action)
      return {
        id: action.id,
        author: action.author,
        message: action.message,
        toggled: false
      }
    case 'TOGGLE_MESSAGE':
      if (state.id !== action.id) {
        return state
      }
      return { ...state, toggled: !state.toggled}
    default:
      return state
  }
}

const messages = (state = [], action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return [
        ...state,
        message(undefined, action)
      ]
    case 'TOGGLE_MESSAGE':
    return state.map(m =>
      message(m, action)
    )
    default:
      return state
  }
}

export default messages
