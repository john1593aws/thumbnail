const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });

const credentials = new AWS.SharedIniFileCredentials();

const bucketName = 'items593';

const s3 = new AWS.S3({
  accessKeyId: credentials.accessKeyId,
  secretAccessKey: credentials.secretAccessKey,
});

async function getS3Data() {
  let d;
  try {
    d = await s3.listObjectsV2({ Bucket: bucketName }).promise();
  } catch (e) {
    throw e; // an error occurred
  }

  const content = [];
  for (const currentValue of d.Contents) {
    if (currentValue.Size > 0) {
      const goParams = { Bucket: bucketName, Key: currentValue.Key };
      let data, url;
      try {
        data = await s3.getObject(goParams).promise();
        url = s3.getSignedUrl('getObject', {
          Bucket: bucketName,
          Key: currentValue.Key,
        });
      } catch (e) {
        throw e; //error
      }
      content.push({
        Body: data.Body,
        Key: currentValue.Key,
        url,
      });
    }
  }
  return content;
}

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
          return resolve(data);
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = { s3, uploadFile, getS3Data };
