const pool = require('../lib/db.js')

/**
 * Takes in a phone number and will return if they are registered or not, along with texter information if found.
 * @param {*This parameter takes a phone number in the format +18887776666} phone 
 */
function identifyTexter(phone) {
    return new Promise(function (resolve, reject) {
        let sql = `
        SELECT id_texters, phone, firstname, lastname, streetname, city, state, zip, email, timestamp
        FROM texters
        WHERE phone = ?`
        pool.getConnection(function (err, connection) {
            connection.query(sql, [phone], function (err, results, fields) {
                connection.release()
                if (err) {
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

function checkCampaign(phone) {
    return new Promise(function (resolve, reject) {
        let sql = `
        SELECT ca.id_campaign_act, ca.id_texter, ca.id_campaign, ca.confirmed, ca.active
        FROM campaign_activity as ca
        JOIN texters as t ON t.id_texters=ca.id_texter
        WHERE t.phone = ? AND active = 1`
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
                    } else if(results.length == 0){
                        resolve({
                            status: 'Success',
                            error: false,
                            activeCampaign: false
                        })
                    }else {
                        resolve({
                            status: 'Success',
                            error: false,
                            activeCampaign: true,
                            id_campaign:results[0].id_campaign
                        })
                    }
                })
            }
        })
    })
}

function updateCampaign(id_campaign,id_texter,confirmed){
    return new Promise(function(resolve,reject){
        let sql = ''
        if(confirmed){
            sql = `
            UPDATE campaign_activity
            SET confirmed = 1
            WHERE id_campaign = ? AND id_texter = ?`
        }else{
            sql = `
            UPDATE campaign_activity
            SET active = 0
            WHERE id_campaign = ? AND id_texter = ?`
        }
        pool.getConnection(function (err, connection) {
            if(err){
                reject({
                    status: 'Failure',
                    error: true,
                    errorMessage: ['Unable to connect to db to update campaign']
                })
            }else{
                connection.query(sql,[id_campaign,id_texter],function(err,results,fields){
                    connection.release()
                    if(err){
                        reject({
                            status:'Failure',
                            error:true,
                            errorMessage: ['Problem updating records for campaign activity']
                        })
                    }else{
                        resolve({
                            status:'Success',
                            id_campaign:id_campaign,
                            id_texter: id_texter,
                        })
                    }
                })
            }
        })
    })
}

function joinCampaign(id_campaign,id_texter){
    return new Promise(function(resolve,reject){
        let sql = `
        INSERT INTO campaign_activity ( id_campaign, id_texter)
        VALUES (?,?);`
        pool.getConnection(function (err, connection) {
            if(err){
                reject({
                    status: 'Failure',
                    error: true,
                    errorMessage: ['Unable to connect to db to join campaign']
                })
            }else{
                connection.query(sql,[id_campaign,id_texter],function(err,results,fields){
                    connection.release()
                    if(err){
                        reject({
                            status:'Failure',
                            error:true,
                            errorMessage: ['Problem updating records for joining campaign']
                        })
                    }else{
                        resolve({
                            status:'Success',
                            id_campaign:id_campaign,
                            id_texter: id_texter,
                        })
                    }
                })
            }
        })
    })
}

function findCampaign(textBody){
    return new Promise(function(resolve,reject){
        let search = /^[\w\W\d]*$/i.exec(textBody)
        let sql=`
        SELECT keywords, id AS campaign_id, name
        FROM campaigns
        WHERE keywords LIKE ?`
        pool.getConnection(function (err, connection) {
            if(err){
                console.log(err)
                reject()
            }
            else{
                connection.query(sql,[search[0]],function(err,results,fields){
                    connection.release()
                    if(err){
                        console.log(err)
                        reject()
                    }
                    else if(results.length == 0){
                        resolve({
                            status:'Success',
                            error:false,
                            message:'Campaign not found',
                            campaign_id:null
                        })
                    }
                    else{
                        resolve({
                            status:'Success',
                            error:false,
                            campaign_id:results[0].campaign_id
                        })
                    }
                })
            }
        })
    }) 
}

module.exports = {
    identifyTexter,
    checkCampaign,
    updateCampaign,
    joinCampaign,
    findCampaign
}