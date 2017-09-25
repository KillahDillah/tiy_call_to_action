const pool = require('../lib/db.js')

function insertText(text){
    //console.log("text",text)
    return new Promise(function(resolve,reject){
        let sql = `
        INSERT INTO texts (SmsMessageSid,NumMedia,SmsSid,Body,TextTo,TextFrom,MessageSid,Processed)
        VALUES (?,?,?,?,?,?,?,?)
        `
        pool.getConnection(function(err,connection){
            connection.query(sql,[text.SmsMessageSid,text.NumMedia,text.SmsSid,text.Body,text.To,text.From,text.MessageSid,text.Processed],function(err,results,fields){
                if(err){
                    console.log(err)
                    connection.release()
                    reject({
                        status:'Failure',
                        error:true,
                        errorMessage:['Text was not stored in the database']
                    })
                }else{
                    connection.release()
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
        
    })
}

module.exports = {
    insertText:insertText
}