var path = require('path');
var express = require('express');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { connect } = require('./db');
const cors = require('cors');
var itemsRouter = require('./routes/items');

var app = express();

connect();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/items', itemsRouter);
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});
module.exports = app;
