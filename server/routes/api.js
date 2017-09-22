var express = require('express');
var router = express.Router();
var twilio = require('twilio')
const Text = require('../model/textModel')

/* /api starting endpoint */
router.post('/sms', function(req, res, next) {
  Text.insertText(req.body.Body)
  var twiml = new twilio.TwimlResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

module.exports = router;
