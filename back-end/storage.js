const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });

const credentials = new AWS.SharedIniFileCredentials();

const bucketName = 'items593';

const s3 = new AWS.S3({
  accessKeyId: credentials.accessKeyId,
  secretAccessKey: credentials.secretAccessKey,
});

const getFiles = () => {
  return new Promise((resolve, reject) => {
    try {
      const params = {
        Bucket: bucketName,
      };

      s3.listObjects(params, (err, data) => {
        if (err) {
          return reject(err);
        }
        if (data) {
          console.log(data.Contents);
          return resolve(data.Contents);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

const uploadFile = (file, key) => {
  return new Promise((resolve, reject) => {
    try {
      const uploadParams = {
        Bucket: bucketName,
        Key: key,
        Body: file.buffer,
      };

      s3.upload(uploadParams, (err, data) => {
        if (err) {
          return reject(err);
        }
        if (data) {
          console.log(data);
          return resolve(data);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = { s3, getFiles, uploadFile };
