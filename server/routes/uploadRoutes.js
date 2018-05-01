const AWS = require('aws-sdk');
const keys = require('../../config/keys');

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
})

module.exports = app => {
  app.get('/api/upload', (req,res) => {
    const key = `420/${req.query.orientation}.jpeg`;

    s3.getSignedUrl('putObject', {
      Bucket: 'test-wear-modello',
      ContentType: 'image/jpeg',
      Key: key
    }, (err, url) => res.send({ key, url }));
  });
};