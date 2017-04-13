export const sendMessage = (message) => {
  return {
    type: 'server/SEND_MESSAGE',
    message
  }
}

export const toggleMessage = (id) => {
  return {
    type: 'TOGGLE_MESSAGE',
    id
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}
