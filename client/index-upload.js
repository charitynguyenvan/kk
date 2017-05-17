import React from 'react'
import { render } from 'react-dom'
import config from '../config'
import ImageUpload from './components/s3/ImageUpload'

render(
  <div>
    <ImageUpload />
    <img src="http://kajkai-avatar.s3-ap-southeast-1.amazonaws.com/098b1328-2152-4867-b8ae-502e6caf9685.jpg"/>
  </div>,
  document.getElementById('root')
)
