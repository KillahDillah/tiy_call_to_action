const conn = require('../lib/db.js')

function insertText(text){
    return new Promise(function(resolve,reject){
        let sql = `
        INSERT INTO texts (SmsMessageSid,NumMedia,SmsSid,Body,To,From,MessageSid,Processed)
        VALUES (?,?,?,?,?,?,?,?)
        `
        conn.query(sql,[text.SmsMessageSid,text.NumMedia,text.SmsSid,text.Body,text.To,text.From,text.MessageSid,text.Processed],function(err,results,fields){
            if(err){
                reject({
                    status:'Failure',
                    error:true,
                    errorMessage:['Text was not stored in the database']
                })
            }else{
                resolve(
                    {
                        status:'Success',
                        body:text.Body,
                        from:text.From
                    }
                )
            }
        })
    })
}