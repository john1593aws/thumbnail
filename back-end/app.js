const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { connect } = require('./db');
const cors = require('cors');
const itemsRouter = require('./routes/items');
const app = express();

connect();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/items', itemsRouter);
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

module.exports = app;
