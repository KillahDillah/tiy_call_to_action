const express = require('express');
const router = express.Router();
const Twilio = require('twilio')
const Text = require('../model/texterModel')
const conn = require('../lib/db')
const MessageRouter = require('../model/messageRouter')
const Representative = require('../model/representativeModel')

/**
 * This a webhook for Twilio to use to send incoming text messages.
 */
router.post('/sms', function (req, res, next) {
  let fullUrl = req.protocol + '://' + req.get('host') + '/register'
  MessageRouter.messageRouter(req.body.From,req.body.Body,function(message){
    res.send(`<Response>
    <Message>${message}</Message>
  </Response>`)
  },fullUrl)
});


//TODO: Add in a put method for texter after they have registered to go over messageRouter again.
/**
 * This is an endpoint for a texter to register for the service.
 * TODO: Add validation.
 */
router.post('/texter', function (req, res, next) {
  let identity = {
    phone: req.body.phone,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    streetnumber: req.body.streetnumber,
    streetname: req.body.streetname,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    email: req.body.email || '',
    address: req.body.address
  }
  let texter = Text.insertTexter(identity)
  texter.catch(function (err) {
    //If there is an error registering, success is sent as false to let the client tell them there was an error
    res.send({
      success: false,
      error: err
    })
  })
    .then(
    function (data) {
      res.send({
        success: true,
        id: data.id
      })
    }
    )

})

router.post('/texter/test', function (req, res, next) {
  let identity = {
    phone: req.body.phone,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    streetnumber: req.body.streetnumber,
    streetname: req.body.streetname,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    email: req.body.email || '',
    address: req.body.address
  }
  let repsBlob = Representative.findRepresentatives(identity.address)
  repsBlob.catch(console.log)
  .then(blob => Representative.createRepsArray(blob))
  .then(blob => {
    let stuff = Representative.storeReps(blob,'301')
    stuff.catch(console.log)
    .then(console.log)
    res.json(blob)
  })
})

router.post("/NewCampaign", function(req,res,next){
  const name = req.body.campname
  const SDesc = req.body.campsdesc
  const LDesc = req.body.campldesc
  const keywords= req.body.keywords

  const sql= `
  INSERT INTO campaigns (name, shortDesc, longDesc, keywords)
  VALUES (?,?,?,?)
  `

  conn.query(sql, [name,SDesc,LDesc,keywords], function(err,results,fields){
    if (!err){
      res.json({
        'it':'works'
      })
    } else {
      console.log(err)
      res.json({
        'it':'doesnt work',
        err: err
      })
    }
  })
})
module.exports = router;
