const Twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN); 

function sendSMS(body,to){
    return new Promise(function(resolve,reject){
        Twilio.messages.create({ 
            to: to, 
            from: process.env.TWILIO_PHONE_NUMBER, 
            body: body, 
        }, function(err, message) { 
            if(err){
                console.log("err from sending text",err)
                reject({
                    status:'Failure',
                    error:true,
                    err:err,
                    errorMessage:['Unable to send text']
                })
            }else{
                console.log(message.sid)
                resolve({
                    status:'Success',
                    error:false,
                    phone:to,
                    message:message
                })
            }
        })
    })
}

module.exports = {
    sendSMS
}