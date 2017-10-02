const pool = require('../lib/db.js')
const Twilio = require('./twilioModel')

function getCampaignDetails(id_campaign){
    return new Promise(function(resolve,reject){
        let sql = `
        SELECT ca.id_campaign, t.id_texters, ca.timestamp, t.phone as 'texterPhone', t.firstname AS 'texterFirstName', t.lastname as 'texterLastName', t.email as 'texterEmail', 
        t.streetnumber as 'texterStreetNumber', t.streetname as 'texterStreetName', t.city as 'texterCity', t.state as 'texterState', t.zip as 'texterZip', GROUP_CONCAT(DISTINCT CONCAT(r.office_name,': ', r.name ) SEPARATOR ', ') as texterRepresentatives
        FROM campaign_activity as ca
        JOIN texters as t on ca.id_texter=t.id_texters
        JOIN representatives r on t.id_texters=r.id_texters
        WHERE ca.active =1 AND ca.confirmed=1 AND ca.id_campaign LIKE ?
        group by t.id_texters;`
        pool.getConnection(function(err,connection){
            if(err){
                reject({
                    status:'Failure',
                    err:err,
                    error:true,
                    errorMessage:['Unable to get db connection getCampaignDetails']
                })
            }
            else{
                connection.query(sql,[id_campaign],function(err,results,fields){
                    connection.release()
                    if(err){
                        reject({
                            status:'Failure',
                            err:err,
                            error:true,
                            errorMessage:['Query issue getCampaignDetails']
                        })
                    }else if(results.length == 0){
                        resolve({
                            status:'Success',
                            error:false,
                            id_campaign:null,
                            message:'No campaign details found'
                        })
                    }else{
                        resolve({
                            status:'Success',
                            error:false,
                            id_campaign:id_campaign,
                            results:results
                        })
                    }
                })
            }
        })
    })
}

function updateCampaign(body,arrPhone){
    arrPhone.forEach(function(phone){
        Twilio.sendSMS(body,phone)
    })
}
module.exports = {
    getCampaignDetails:getCampaignDetails
}