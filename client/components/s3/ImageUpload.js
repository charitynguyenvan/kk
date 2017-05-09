import React from 'react'
import config from '../../../config'

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: ''
    }
    this.handleUpload = this.handleUpload.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
  }

  handleUpload(e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = this.state.file

    let fileName = file.name

    let fileExtension = fileName.split('.')[fileName.split('.').length - 1].toLowerCase()

    fetch(config.getDomain() + '/s3putobjectsignedurl', {
      method: 'GET',
      headers: {
        "Content-Type": fileExtension
      }
    })
    .then((res) => res.json())
    .then((json) => {
      const { url } = json

      reader.onload = () => {
        fetch(url, {
          method: 'PUT',
          body: reader.result
        })
        .then(res => {
          console.log('putObject success')
        }, err => {
          console.log('error from aws', err)
        })
      }

      reader.readAsArrayBuffer(file)
    }, (err) => {
      console.log('lỗi', err)
    })
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />)
    } else {
      $imagePreview = (<div >Please select an Image for Preview</div>)
    }

    return (
      <div >
        <input
          type="file"
          onChange={this.handleImageChange}
         />
        <button onClick={this.handleUpload}>Upload Image</button>
        <div >
          {$imagePreview}
        </div>
      </div>
    )
  }
}
