const express = require('express');
const path = require('path');
const logger = require('morgan');
const jokes = require('./jokes');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/', jokes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next({
    code: 404,
    message: 'Not Found'
  });
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  return res.json({
      message: err.message,
      error: err.code
  });
});


module.exports = app;
