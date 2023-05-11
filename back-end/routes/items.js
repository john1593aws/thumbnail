var express = require('express');
const { sequelize } = require('../db');
const { uploadFile, getFiles, getObject, getS3Data } = require('../storage');
const multer = require('multer');
const upload = multer();

var router = express.Router();

const cuuid = require('cuuid');

router.get('/', async function (req, res) {
  try {
    const items = await sequelize.query(
      'SELECT id, name FROM item.items As item;'
    );

    const s3Data = await getS3Data();

    const itemsWithFiles = items[0].map((item) => {
      const file = s3Data.find((data) => data.Key === item.id);
      return { ...item, file: file.Body };
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

    await sequelize.query(
      `INSERT INTO item.items(name, id) VALUES ('${name}', '${id}')`
    );
    const items = await sequelize.query(
      'SELECT id, name FROM item.items As item;'
    );
    res.send(items);
  } catch (error) {
    res.send('Items POST ERROR: ', error);
  }
});

module.exports = router;
