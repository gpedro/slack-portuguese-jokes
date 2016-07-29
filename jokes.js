const express = require('express');
const got = require('got');
const router = express.Router();
const joke = require('./joke');
const send = (data) => {
  got.post(data.response_url, {
    body: {
      "text": "Portuguese Jokes",
      "attachments": [
        {
            "text": joke.get()
        }
      ]
    }
  });
}

router.get('/', function (req, res, next) {
  console.log('ping');
  return res.redirect('https://github.com/gpedro/slack-portuguese-jokes/');
});

router.post('/', function(req, res, next) {
  send(res.body)
  return res.status(200);
});

module.exports = router;
