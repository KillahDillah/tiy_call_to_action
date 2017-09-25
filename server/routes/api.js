const express = require('express');
const router = express.Router();
const Twilio = require('twilio')
const Text = require('../model/textModel')

/* /api starting endpoint */
router.post('/sms', function (req, res, next) {
  console.log("body", req.body)
  let text = Text.insertText(req.body)
  text.catch(function (err) {
    console.log(err)
  })
    .then(function (data) {
      console.log(data)
    })
    let identify = Text.identifyTexter(req.body.From)
    identify.catch(function (err) {
      console.log(err)
      res.end()
    })
      .then(function (data) {
        console.log("data",data)
        if(data.registered !== true){
          res.send(`<Response>
          <Message>You are not registerd yet!</Message>
        </Response>`)
        }else{
          res.send(`<Response>
          <Message>Hello ${data.texter.firstname} ${data.texter.lastname}! We've seen you before!</Message>
        </Response>`)
        }
      })
  ;
});

module.exports = router;
