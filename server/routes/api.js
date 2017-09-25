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
        let fullUrl = req.protocol + '://' + req.get('host') + '/register'
        console.log("data",data)
        if(data.registered === false){
          res.send(`<Response>
          <Message>You are not registerd yet! ${fullUrl}</Message>
        </Response>`)
        }else{
          res.send(`<Response>
          <Message>Hello ${data.texter.firstname} ${data.texter.lastname}! We've seen you before!</Message>
        </Response>`)
        }
      })
  ;
});

router.post('/texter', function(req,res,next){
  console.log("texter req",req.body)
  let identity = {
    phone:req.body.phone,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    streetname:req.body.streetname,
    city:req.body.city,
    state:req.body.state,
    zip:req.body.zip,
    email: req.body.email || ''
  }
  let texter = Text.insertTexter(identity)
  texter.catch(function (err) {
    res.send({success:false,
              error:err})
  })
  .then(
    function(data){
      console.log(data)
      res.send({success:true,
                id:data.id})
    }
  )
})

module.exports = router;
