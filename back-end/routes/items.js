var express = require('express');
const { sequelize } = require('../db');

var router = express.Router();

const cuuid = require('cuuid');
// const sequelize = await connect();
/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const items = await sequelize.query(
      'SELECT id, name FROM item.items As item;'
    );
    res.send(items);
  } catch (error) {
    res.send(error);
  }
});

router.post('/', async (req, res, next) => {
  const id = cuuid();
  try {
    const item = await sequelize.query(
      `INSERT INTO item.items(name, id) VALUES ('${req.body.name}', '${id}');`
    );
    res.send(item);
  } catch (error) {
    res.send('Items POST ERROR: ', error);
  }
});

module.exports = router;
