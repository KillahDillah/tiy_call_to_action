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
        INSERT INTO texters (phone,firstname,lastname,streetnumber,streetname,city,state,zip,email,address)
        VALUES (?,?,?,?,?,?,?,?,?,?);`
        pool.getConnection(function (err, connection) {
            if (err) {
                reject({
                    status: 'Failure',
                    error: true,
                    errorMessage: ['Unable to connect to DB']
                })
            }
            else {
                connection.query(sql, [texter.phone, texter.firstname, texter.lastname, texter.streetnumber, texter.streetname, texter.city, texter.state, texter.zip, texter.email,texter.address], function (err, results, fields) {
                    connection.release()
                    if (err) {
                        console.log(err)
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
                    connection.release()
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


module.exports = {
    insertText: insertText,
    identifyTexter: identifyTexter,
    insertTexter: insertTexter
}