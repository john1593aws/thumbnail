const AWS = require('aws-sdk');
const { GetObjectCommand } = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' });

const credentials = new AWS.SharedIniFileCredentials();

const bucketName = 'items593';

const s3 = new AWS.S3({
  accessKeyId: credentials.accessKeyId,
  secretAccessKey: credentials.secretAccessKey,
});

function getObject(key) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = (
        await s3.getObject({ Bucket: bucketName, Key: key }).promise()
      ).Body.toString('utf-8');

      resolve(response);
    } catch (err) {
      // Handle the error or throw
      return reject(err);
    }
  });
}

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
      let data;
      try {
        data = await s3.getObject(goParams).promise();
      } catch (e) {
        throw e; //error
      }
      content.push({
        Body: data.Body,
        Key: currentValue.Key,
      });
    }
  }
  return content;
}

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

module.exports = { s3, getFiles, uploadFile, getObject, getS3Data };
