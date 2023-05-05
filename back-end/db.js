const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');

dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE_URL);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return sequelize;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, connect, DataTypes };
