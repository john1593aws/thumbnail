var express = require('express');
const { sequelize } = require('../db');
const { uploadFile, getFiles, getObject, getS3Data } = require('../storage');
const multer = require('multer');
const upload = multer();

var router = express.Router();

const cuuid = require('cuuid');

router.get('/', async function (req, res) {
  try {
    const items = await sequelize.query('SELECT * FROM item.items As item;');

    const s3Data = await getS3Data();

    const itemsWithFiles = items[0].map((item) => {
      const { name, id, file_data } = item;
      const file = s3Data.find((data) => data.Key === item.id);

      const parsedFileData = JSON.parse(file_data);
      const buffer = file.Body;
      const x = file.Body.buffer;
      return {
        name,
        id,
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
    const { fieldname, originalname, encoding, mimetype, size } = file;

    const fileData = {
      fieldname,
      originalname,
      encoding,
      mimetype,
      size,
    };

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

      return { name, id, file: { ...parsedFileData, buffer: file.Body } };
    });

    res.send(itemsWithFiles);
  } catch (error) {
    res.send('Items POST ERROR: ', error);
  }
});

module.exports = router;
