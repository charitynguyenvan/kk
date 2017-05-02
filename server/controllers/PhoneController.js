import { mNexmoVerifyPhone, mNexmoVerifyCheck, mNexmoVerifyLogout } from '../services/PhoneService'

export const verifyPhone = () => (req, res) => {
  const { phone } = req.body

  mNexmoVerifyPhone(phone)
  .then((status) => {
      res.send({status})
  }, (err) => {
    res.send({
      status: 'error'
    })
  })
}

export const verifyCheck = () => (req, res) => {
  const { phone, code } = req.body
    mNexmoVerifyCheck(phone, code)
    .then((status) => {
        res.send({status})
    }, (err) => {
      res.send({
        status: 'error'
      })
    })
}

export const verifyLogout = () => (req, res) => {
  const { phone } = req.body
    mNexmoVerifyLogout(phone)
    .then((status) => {
        res.send({status})
    }, (err) => {
      res.send({
        status: 'error'
      })
    })
}
