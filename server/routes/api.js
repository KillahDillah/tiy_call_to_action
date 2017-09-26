const express = require('express');
const router = express.Router();
const Twilio = require('twilio')
const Text = require('../model/textModel')
const conn = require('../lib/db')
const hash = require('js-sha512')

/**
 * This a webhook for Twilio to use to send incoming text messages.
 */
router.post('/sms', function (req, res, next) {
  //Creates a promise to store the incoming text, does not handle the response to client.
  let text = Text.insertText(req.body)
  text.catch(function (err) {
    console.log(err)
  })
    .then(function (data) {
      console.log(data)
    })
  //Creates a promise to see if the texter has been identified.
  let identify = Text.identifyTexter(req.body.From)
  identify.catch(function (err) {
    console.log(err)
    res.end()
  })
    .then(function (data) {
      //If the texter is not register it will tell them they need to register
      let fullUrl = req.protocol + '://' + req.get('host') + '/register'
      if (data.registered === false) {
        res.send(`<Response>
          <Message>You are not registerd yet! ${fullUrl}</Message>
        </Response>`)
      } else {
        res.send(`<Response>
          <Message>Hello ${data.texter.firstname} ${data.texter.lastname}! We've seen you before!</Message>
        </Response>`)
      }
    })
    ;
});

/**
 * This is an endpoint for a texter to register for the service.
 * TODO: Add validation.
 */
router.post('/texter', function (req, res, next) {
  let identity = {
    phone: req.body.phone,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    streetname: req.body.streetname,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    email: req.body.email || ''
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

router.post('/CampaignerReg', function (req,res,next){
  const fname = req.body.fname
  const lname = req.body.lname
  const username = req.body.username
  const email = req.body.email
  const password = hash (req.body.password)

  const sql= `
  INSERT INTO clogin (fname, lname, username, email, password)
  VALUES (?,?,?,?,?)
  `
  conn.query(sql, [fname,lname,username,email,password], function(err,results,fields){
    if (!err){
      res.redirect('/register')
    } else {
      next ("username already taken")
    }
  })
})

router.post("/Login", function(req,res,next){
  const username = req.body.username
  const password = hash(req.body.password)

  const sql = `
    SELECT * 
    FROM clogin
    WHERE username = ?
    AND password = ?
  `
  conn.query(sql, [username, password], function(err, results, fields){
    if (results.length > 0) { // username and password are correct
      res.json(200)// return a res.json with status code 200
    } else {
      res.json(400)// return a res.json with status code 400
      
    }
   })
})

module.exports = router;
