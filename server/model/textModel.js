const pool = require('../lib/db.js')

/**
 * This method inserts all the texts received from Twilio. Will return a promise with a status and error when failed, otherwise also returns the text body and from.
 * @param {*Expects the standard post from Twilio of text message details} text 
 */
function insertText(text) {
    return new Promise(function (resolve, reject) {
        let sql = `
        INSERT INTO texts (SmsMessageSid,NumMedia,SmsSid,Body,TextTo,TextFrom,MessageSid,Processed)
        VALUES (?,?,?,?,?,?,?,?)
        `
        pool.getConnection(function (err, connection) {
            connection.query(sql, [text.SmsMessageSid, text.NumMedia, text.SmsSid, text.Body, text.To, text.From, text.MessageSid, text.Processed], function (err, results, fields) {
                if (err) {
                    console.log(err)
                    connection.release()
                    reject({
                        status: 'Failure',
                        error: true,
                        errorMessage: ['Text was not stored in the database']
                    })
                } else {
                    connection.release()
                    resolve(
                        {
                            status: 'Success',
                            body: text.Body,
                            from: text.From
                        }
                    )
                }
            })
        })

    })
}

/**
 * Takes in a phone number and will return if they are registered or not, along with texter information if found.
 * @param {*This parameter takes a phone number in the format +18887776666} phone 
 */
function identifyTexter(phone) {
    return new Promise(function (resolve, reject) {
        let sql = `
        SELECT phone, firstname, lastname, streetname, city, state, zip, email, timestamp
        FROM texters
        WHERE phone = ?`
        pool.getConnection(function (err, connection) {
            connection.query(sql, [phone], function (err, results, fields) {
                if (err) {
                    connection.release()
                    reject({
                        status: 'Failure',
                        error: true,
                        errorMessage: ['Unable to query the DB for phone']
                    })
                }
                else if (results.length == 0) {
                    resolve({
                        status: 'Success',
                        error: false,
                        registered: false,
                    })
                } else {
                    let texter = results[0]
                    resolve({
                        status: 'Success',
                        error: false,
                        registered: true,
                        texter: texter
                    })
                }
            })
        })
    })
}
/**
 * Returns a promise with the insert id if successful
 * @param {*Takes in a json object with all fields needed for a texter} texter 
 */
function insertTexter(texter) {
    return new Promise(function (resolve, reject) {
        let sql = `
        INSERT INTO texters (phone,firstname,lastname,streetname,city,state,zip,email)
        VALUES (?,?,?,?,?,?,?,?);`
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release()
                reject({
                    status: 'Failure',
                    error: true,
                    errorMessage: ['Unable to connect to DB']
                })
            }
            else {
                connection.query(sql, [texter.phone, texter.firstname, texter.lastname, texter.streetname, texter.city, texter.state, texter.zip, texter.email], function (err, results, fields) {
                    if (err) {
                        reject({
                            status: 'Failure',
                            error: true,
                            errorMessage: ['Unable to insert into the DB for texter']
                        })
                    } else {
                        resolve({
                            status: 'Success',
                            error: false,
                            id: results.insertId
                        })
                    }
                })
            }
        })
    })
}
function checkCampaign(phone) {
    return new Promise(function (resolve, reject) {
        let sql = `
        SELECT id_text, TextFrom, Body, Processed, campaign_id
        FROM texts
        WHERE TextFrom =  ?
        order by timestamp desc
        LIMIT 1`
        pool.getConnection(function (err, connection) {
            if (err) {
                reject({
                    status: 'Failure',
                    error: true,
                    errorMessage: ['Unable to connect to DB']
                })
            }
            else {
                connection.query(sql, [phone], function (err, results, fields) {
                    if (err) {
                        reject({
                            status: 'Failure',
                            error: true,
                            errorMessage: ['Unable to query for campaign']
                        })
                    } else {
                        resolve({
                            status: 'Success',
                            error: false,
                            results: results[0]
                        })
                    }
                })
            }
        })
    })
}

function checkBody(textBody){
    return new Promise(function(resolve,reject){
        //Check if it is a confirmation text or not
        if(/^yes$/i.test(textBody)){
            resolve({
                status:'Success',
                error:false,
                message:'Yes was found',
                confirmation:true
            })
        }
        else if(/^no$/i.test(textBody)){
            resolve({
                status:'Success',
                error:false,
                message:'No was found',
                confirmation:false
            })
        }
        else{
            let search = /^[\w\W\d]*$/i.exec(textBody)
            let sql=`
            SELECT keywords, id AS campaign_id, name
            FROM campaigns
            WHERE keywords LIKE ?`
            pool.getConnection(function (err, connection) {
                if(err){
                    connection.release()
                    console.log(err)
                    reject()
                }
                else{
                    connection.query(sql,[search[0]],function(err,results,fields){
                        if(err){
                            connection.release()
                            console.log(err)
                            reject()
                        }
                        else if(results.length == 0){
                            connection.release()
                            resolve({
                                status:'Success',
                                error:false,
                                message:'Campaign not found',
                                campaign:null
                            })
                        }
                        else{
                            connection.release()
                            resolve({
                                status:'Success',
                                error:false,
                                campaign:{
                                    campaign_id:results[0].campaign_id,
                                    name:results[0].name,
                                    keyword:results[0].keywords
                                },
                                confirmation:null
                            })
                        }
                    })
                }
            })
        }
    })
}

/*
1. Check phone number
    -If not recognized, send registration. Will accept a 'put' request later to start the process again.
2. Find last text message from the user
3. Check to see if texter has open campaigns
4. If open campaign, check yes or no for confirmation
5. If no open campaign, send back confirmation of joining campaign
6. Store text

State will have:
texts rowId
registered t/f
active campaign t/f

*/
function processText(textBody) {
    let state = {
        previousTextId: '',
        campaign: {},
        previousBody: '',
        registered: false,
        activeCampaign: false,
        processed: false,
        currentBody: textBody.Body,
        confirmation:''
    }
    return new Promise(function (resolve, reject) {
        let texter = identifyTexter(textBody.From)
        texter
            .catch(err => reject({ err }))
        texter
            .then(data => {
                state.registered = data.registered
                if (state.registered) {
                    state.texter = data.texter
                }
                let campaign = checkCampaign(textBody.From)
                campaign
                    .catch(err => reject({ err }))
                    .then(data => {
                        if(data.campaign){
                            state.campaign = data.results[0]
                            state.activeCampaign = true
                        }else{
                            state.campaign = null
                            state.activeCampaign = false
                        }
                        state.processed = data.results.Processed || null
                        state.previousBody = data.results.Body || null
                        state.previousTextId = data.results.id_text || null
                    })
                    .then(data =>{
                        let checks = checkBody(textBody)
                        checks.catch(console.log)
                        .then(data => {
                            state.campaign = data.campaign || null
                            state.confirmation = data.confirmation || null
                        })
                    })
            })
            .then(data =>{
                resolve(state)
            })
    })
}

module.exports = {
    insertText: insertText,
    identifyTexter: identifyTexter,
    insertTexter: insertTexter,
    checkCampaign: checkCampaign,
    processText: processText,
    checkBody:checkBody
}