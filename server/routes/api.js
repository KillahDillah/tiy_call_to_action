const express = require('express');
const router = express.Router();
const Twilio = require('twilio')
const Text = require('../model/textModel')
const conn = require('../lib/db')

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
