import auth from './common/middlewares/auth'

export default {
  '/demo': {
    get: {
      controller: 'DemoController',
      middleware: [auth()],
      method: 'getDemo'
    },
    post: {
      controller: 'DemoController',
      method: 'postDemo'
    }
  },
  '/verifyphone': {
    post: {
      controller: 'PhoneController',
      method: 'verifyPhone'
    }
  },
  '/verifycheck': {
    post: {
      controller: 'PhoneController',
      method: 'verifyCheck'
    }
  }
}
