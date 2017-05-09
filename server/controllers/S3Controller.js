import { generateS3PutObjectSignedUrl } from '../services/S3Service'

export const getS3PutObjectSignedUrl = () => (req, res) => {
  const url = generateS3PutObjectSignedUrl(req.headers['content-type'])
  
  res.send({url})
}
