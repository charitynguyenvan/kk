import { mTwilioVerifyPhone } from '../services/PhoneService'
import { mNexmoVerifyPhone, mNexmoVerifyCheck } from '../services/PhoneService'

export const verifyPhone = () => (req, res) => {
  const { phone } = req.body
  mNexmoVerifyPhone(phone)
  // mTwilioVerifyPhone(phone)
  res.send('Hope OK')
}

export const verifyCheck = () => (req, res) => {
  const { phone, code } = req.body
    mNexmoVerifyCheck(phone, code)
    res.send('Hope Check OK')
}
