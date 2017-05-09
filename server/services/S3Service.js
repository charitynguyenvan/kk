import AWS from 'aws-sdk'
import uuidV4 from 'uuid/v4'

AWS.config.update({
  region: 'ap-southeast-1'
})
const s3 = new AWS.S3()

export const generateS3PutObjectSignedUrl = (fileExtension) => {

  let objectName = uuidV4()
  let key = objectName + "." + fileExtension
  const params = {
    Bucket: 'kajkai-avatar',

    // uuid generate unique name to store file in S3
    // will discuss with Đại about this part :)))
    Key: key,
    ACL: "public-read",
    Expires: 300 // 300 seconds
  }

  /*
  TODO the url to get object is
  kajkai-avatar.s3-ap-southeast-1.amazonaws.com/{key}
  server should store this url
  */

  // this is url for putting object
  const url = s3.getSignedUrl('putObject', params)
  return url
}
