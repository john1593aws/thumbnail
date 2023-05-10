const { sequelize, DataTypes } = require('../db');

const Item = sequelize.define(
  'item',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = { Item };
