const express = require('express');
const got = require('got');
const router = express.Router();
const joke = require('./joke');

router.get('/', function (req, res, next) {
  return res.redirect('https://github.com/gpedro/slack-portuguese-jokes/');
});

router.post('/', function(req, res, next) {
  const message = joke.get();
  return res.status(200).json({
    "response_type": "in_channel",
    "attachments": [
      {
          "text": message,
          "fallback": message
      }
    ]
  });
});

module.exports = router;
