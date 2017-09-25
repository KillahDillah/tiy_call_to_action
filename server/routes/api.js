const express = require('express');
const router = express.Router();
const Twilio = require('twilio')
const Text = require('../model/textModel')

/* /api starting endpoint */
router.post('/sms', function (req, res, next) {
  console.log("body",req.body)
  let text = Text.insertText(req.body)
  text.catch(function (err) {
    console.log(err)
  })
    .then(function (data) {
      console.log(data)
    })
  //var twiml = new Twilio.twiml.MessagingResponse();
  //twiml.message('The Robots are coming! Head for the hills!');
  //res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.send(`<Response>
  <Message>The Robots are coming! Head for the hills!</Message>
</Response>`);
});

module.exports = router;
