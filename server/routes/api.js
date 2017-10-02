const express = require('express');
const router = express.Router();
const Text = require('../model/texterModel')
const conn = require('../lib/db')
const MessageRouter = require('../model/messageRouter')
const Representative = require('../model/representativeModel')
const Campaign = require('../model/campaignModel')
const hash = require('js-sha512')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('config')
const Twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * This a webhook for Twilio to use to send incoming text messages.
 */
router.post('/sms', function (req, res, next) {
  let fullUrl = req.protocol + '://' + req.get('host') + '/reg/' + req.body.From
  MessageRouter.messageRouter(req.body.From, req.body.Body, function (message) {
    res.send(`<Response>
    <Message>${message}</Message>
  </Response>`)
  }, fullUrl)
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
    address: req.body.address,
    sendSMS: req.body.sendSMS || true
  }
  console.log("req.body.sendSMS",identity.sendSMS)
  if(identity.sendSMS !== 'false'){
    Twilio.messages.create({
      to: identity.phone,
      from: process.env.TWILIO_PHONE_NUMBER,
      body: "You're registered! Please text in your keyword again.",
    }), function (err, message) {
      if (err) {
        console.log("problem sending sms", err)
      }
    }
  }
  let texter = Text.insertTexter(identity)
  texter.catch(function (err) {
    //If there is an error registering, success is sent as false to let the client tell them there was an error
    res.send({
      success: false,
      error: err
    })
  })
    .then(function (data) {
      // res.send({
      //   success: true,
      //   id: data.id
      // })
      return data.id
    })
    .then(function(id_texters){
      let repsBlob = Representative.findRepresentatives(identity.address)
      repsBlob.catch(console.log)
      .then(blob => Representative.createRepsArray(blob))
      .then(blob => {
        let stuff = Representative.storeReps(blob,id_texters)
        stuff.catch(console.log)
        .then()
        res.json({
          succes:true,
          reps:blob,
          id:id_texters}
        )
      })
    })
})

router.get("/campaign/:id_campaign", function (req, res, next) {
  let campaignDetails = Campaign.getCampaignDetails(req.params.id_campaign)
  campaignDetails.catch(err => {
    res.send({ error: true, message: 'Unable to get campaign details' })
  })
    .then(data => {
      res.json(data)
    })
})
router.post("/campaign/id_campaign/updateTexters", function(req,res, next){
  let campaignDetails = Campaign.getCampaignDetails(req.params.id_campaign)
  campaignDetails.catch(err => {
    res.send({ error: true, message: 'Unable to get campaign details' })
  })
    .then(data => {
      let phoneArr = data.results.map(item => item.phone)
      phoneArr.forEach(phone => {
        Twilio.messages.create({
          to: phone,
          from: process.env.TWILIO_PHONE_NUMBER,
          body: req.body.Body,
        }), function (err, message) {
          if (err) {
            console.log("problem sending sms", err)
          }
        }
      })
    })
})
router.post("/NewCampaign", function (req, res, next) {
  const name = req.body.campname
  const SDesc = req.body.campsdesc
  const LDesc = req.body.campldesc
  const keywords = req.body.keywords
  const userId = req.body.userId

  const sql = `
  INSERT INTO campaigns (name, shortDesc, longDesc, keywords, userId)
  VALUES (?,?,?,?,?)
  `

  conn.query(sql, [name, SDesc, LDesc, keywords, userId], function (err, results, fields) {
    if (!err) {
      res.json({
        'it': 'works'
      })
    } else {
      console.log(err)
      res.json({
        'it': 'doesnt work',
        err: err
      })
    }
  })
})

router.post('/CampaignerReg', function (req, res, next) {
  const fname = req.body.fname
  const lname = req.body.lname
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  const checkReg = `
    SELECT *
    FROM clogin
    WHERE username = ?
  `
  conn.query(checkReg, [username], function (err, results, fields) {
    if (results.length > 0) {
      res.status(400).json({
        message: "Username taken"
      })
    } else {
      const sql = `
      INSERT INTO clogin (fname, lname, username, email, password)
      VALUES (?,?,?,?,?)
      `

      bcrypt.hash(password, 10).then(function (hashedPassword) {
        conn.query(sql, [fname, lname, username, email, hashedPassword], function (err, results, fields) {
          if (!err) {
            res.json({
              message: "Success!"
            })
          }
        })
      })
    }
  })
})


router.post("/token", function (req, res, next) {
  const username = req.body.username
  const password = req.body.password

  const sql = `
    SELECT password,id FROM clogin
    WHERE username = ?
  `
  conn.query(sql, [username], function (err, results, fields) {
    if (results.length > 0) {
      const hashedPassword = results[0].password
      bcrypt.compare(password, hashedPassword).then(function (result) {
        if (result) {
          res.json({
            token: jwt.sign({ userId: results[0].id }, config.get('secret'), { expiresIn: config.get('sessionLengthInSeconds') })
          })
        } else {
          res.status(401).json({
            message: 'Invalid Credentials'
          })
        }
      }).catch(function (err) {
        console.log(err)
      })
    } else {
      res.status(401).json({
        message: 'Invalid Credentials'
      })
    }
  })
})

router.get('/metrics/:id', function (req, res, next) {
  const id = req.params.id

  const sql = `
    SELECT *
    FROM campaigns
    WHERE userID = ?
  `
  conn.query(sql, [id], function (err, results, fields) {
    if (!err) {
      res.json(results)
    }
  })
})

router.get('/letter/:id', function(req,res,next){
  const id = req.params.id
  const sql=`
    SELECT *
    FROM campaigns
    WHERE id = ?
  `
  conn.query(sql,[id], function(err,results,fields){
    if(!err){
      res.json(results)
    }
  })
})

module.exports = router;
