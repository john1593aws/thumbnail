var express = require('express');
const { sequelize } = require('../db');
const { uploadFile, getFiles } = require('../storage');
const multer = require('multer');
const upload = multer();

var router = express.Router();

const cuuid = require('cuuid');

router.get('/', async function (req, res) {
  try {
    const items = await sequelize.query(
      'SELECT id, name FROM item.items As item;'
    );

    const files = await getFiles();

    for (let i = 0; i < items[0].length; i++) {
      items[0][i].file = files.find((file) => file.Key === items[0][i].id);
    }

    res.send(items);
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
