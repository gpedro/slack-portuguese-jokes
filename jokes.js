const express = require('express');
const router = express.Router();
const joke = require('./joke');
const deniedMessage = "este comando não pode ser utilizado neste canal.";

router.get('/', function (req, res, next) {
  return res.redirect('https://github.com/gpedro/slack-portuguese-jokes/');
});

router.post('/', function(req, res, next) {
  const message = joke.get();
  const target = (req.query.allowed_channels || '').split(',');

  if (target && target.indexOf(req.body.channel_name) === -1) {
    return res.status(200).json({
      "attachments": [
        {
            "text": deniedMessage,
            "fallback": deniedMessage
        }
      ]
    })
  }

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
