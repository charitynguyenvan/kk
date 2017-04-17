let data = {}
export const validateTokenDemo = (token) => (token !== undefined)

export const login = (username, password) => (username === password)

export const generateTokenDemo = (username) => {
  const token = Date.now()
  data = {...data, token: username}
  return token
}

export const getUsername = (token) => ('data[token]')
