var express = require('express');
const { sequelize } = require('../db');
const multer = require('multer');
const upload = multer();

var router = express.Router();

const cuuid = require('cuuid');

router.get('/', async function (req, res) {
  try {
    const items = await sequelize.query(
      'SELECT id, name FROM item.items As item;'
    );
    res.send(items);
  } catch (error) {
    res.send(error);
  }
});

router.post('/', upload.any(), async (req, res) => {
  const id = cuuid();
  const { name } = req.body;

  try {
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
