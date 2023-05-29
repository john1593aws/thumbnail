var express = require('express');
const { sequelize } = require('../db');

const imageThumbnail = require('image-thumbnail');
const multer = require('multer');

const upload = multer();

var router = express.Router();

const cuuid = require('cuuid');

router.get('/', async function (req, res) {
  try {
    const [items] = await sequelize.query('SELECT * FROM item.items As item;');

    res.send(items);
  } catch (error) {
    res.send(error);
  }
});

router.post('/', upload.any(), async (req, res) => {
  const id = cuuid();
  const { name } = req.body;

  await sequelize.query(
    `INSERT INTO item.items(name, id) VALUES ('${name}', '${id}')`
  );

  const items = await sequelize.query('SELECT * FROM item.items As item;');

  res.send(items);
});

module.exports = router;
