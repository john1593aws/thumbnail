var express = require('express');
const { sequelize } = require('../db');
const { uploadFile, getS3Data } = require('../storage');
const imageThumbnail = require('image-thumbnail');
const multer = require('multer');

const upload = multer();

var router = express.Router();

const cuuid = require('cuuid');

router.get('/', async function (req, res) {
  try {
    const items = await sequelize.query('SELECT * FROM item.items As item;');

    const s3Data = await getS3Data();

    const itemsWithFiles = items[0].map((item) => {
      const { name, id, file_data, url } = item;
      const file = s3Data.find((data) => data.Key === item.id);

      const parsedFileData = JSON.parse(file_data);
      const buffer = file.Body;
      return {
        name,
        id,
        url: file.url,
        file: { ...parsedFileData, buffer },
      };
    });

    res.send(itemsWithFiles);
  } catch (error) {
    res.send(error);
  }
});

router.post('/', upload.any(), async (req, res) => {
  const id = cuuid();
  const { name } = req.body;
  const file = req.files[0];

  try {
    await uploadFile(file, id);
    const { fieldname, originalname, encoding, mimetype, size, buffer } = file;

    const fileData = {
      fieldname,
      originalname,
      encoding,
      mimetype,
      size,
    };

    if (mimetype.startsWith('image/')) {
      // fileData.imageEncoding = '';
      const options = {
        width: 75,
        height: 75,
        responseType: 'base64',
        jpegOptions: { force: true, quality: 90 },
      };
      fileData.imageEncoding = await imageThumbnail(buffer, options);
    }

    const encodedData = JSON.stringify(fileData);

    await sequelize.query(
      `INSERT INTO item.items(name, id, file_data) VALUES ('${name}', '${id}', '${encodedData}')`
    );

    const items = await sequelize.query('SELECT * FROM item.items As item;');

    const s3Data = await getS3Data();

    const itemsWithFiles = items[0].map((item) => {
      const { name, id, file_data } = item;
      const file = s3Data.find((data) => data.Key === item.id);

      const parsedFileData = JSON.parse(file_data);

      return {
        id,
        name,
        url: file.url,
        file: { ...parsedFileData, buffer: file?.Body },
      };
    });

    res.send(itemsWithFiles);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
