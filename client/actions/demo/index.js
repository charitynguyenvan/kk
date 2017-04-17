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

export const loggingIn = (username) => {
  return {
    type: 'LOGGING_IN',
    username
  }
}

export const logInSuccess = () => {
  return {
    type: 'LOG_IN_SUCCESS'
  }
}

export const logInFailure = () => {
  return {
    type: 'LOG_IN_FAILURE'
  }
}

export const logIn = (username, password) => {
  console.log('dispath ok');
  console.log(username, password);
  return dispatch => {
    console.log(username, password);
    dispatch(loggingIn(username))
    console.log('fetching');
    fetch('http://localhost:3000/demo', {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })
    .then((res) => {
      console.log(res);
      dispatch(logInSuccess())
    }, (err) => {
      console.log('lỗi', err);
      dispatch(logInFailure())
    })
  }
}
