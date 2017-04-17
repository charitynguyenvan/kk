import cookie from 'react-cookie'

export const sendMessage = (message) => ({
    type: 'server/SEND_MESSAGE',
    message
})

export const toggleMessage = (id) => ({
  type: 'TOGGLE_MESSAGE',
  id
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const loginResult = (type) => ({
  type: type
})

export const loggingIn = (username) => ({
  type: 'LOGGING_IN',
  username
})

export const logIn = (username, password) => {
  // console.log('dispath ok');
  // console.log(username, password);
  return dispatch => {
    // console.log(username, password);
    dispatch(loggingIn(username))
    // console.log('fetching');
    fetch('http://localhost:3000/demo', {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })
    .then((res) => {
      console.log('res.ok: ', res.ok);
      console.log('token: ', cookie.load('token'))

      res.json().then(json => {
        console.log(json)
        dispatch(loginResult(json.type))
      })
    }, (err) => {
      console.log('lỗi', err);
      dispatch(loginResult('LOG_IN_FAILURE'))
    })
  }
}
