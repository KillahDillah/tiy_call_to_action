const pool = require('../lib/db.js')
const Twilio = require('./twilioModel')

function getCampaignDetails(id_campaign){
    return new Promise(function(resolve,reject){
        let sql = `
        SELECT ca.id_campaign,
        t.id_texters,
        ca.timestamp,
        t.phone as 'texterPhone',
        t.firstname AS 'texterFirstName',
        t.lastname as 'texterLastName',
        t.email as 'texterEmail',
        t.phone as 'texterPhone',
        t.streetnumber as 'texterStreetNumber',
        t.streetname as 'texterStreetName',
        t.city as 'texterCity',
        t.state as 'texterState',
        t.zip as 'texterZip',
        GROUP_CONCAT(DISTINCT CONCAT(r.office_name,': ', r.name ) SEPARATOR ', ') as texterRepresentatives
                FROM campaign_activity as ca
                JOIN texters as t on ca.id_texter=t.id_texters
                JOIN representatives r on t.id_texters=r.id_texters
                WHERE ca.confirmed=1 AND ca.id_campaign LIKE ?
                group by ca.id_campaign, t.id_texters, ca.timestamp;`
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

function getCampaignKeywordList(id_texters,top,bottom){
    return new Promise(function(resolve,reject){
        let topNum = top || 10
        let bottomNum = bottom || 0
        let sql = `
        SELECT keywords
        FROM campaigns
        LIMIT ?,?`
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
                connection.query(sql,[bottomNum,topNum],function(err,results,fields){
                    connection.release()
                    if(err){
                        reject(
                            {
                                status:'Failure',
                                err:err,
                                error:true,
                                errorMessage:['Failure querying db for list of campaigns']
                            })}
                    else if(results.length == 10){
                        let arr = results.map(item => item.keywords)
                        let textBody = arr.join(", ") + ` - Text back LIST${topNum} to see more.`
                        resolve({
                            textBody:textBody
                        })
                    }
                    else{
                        let arr = results.map(item => item.keywords).join(", ")
                        resolve({
                            textBody:arr
                        })
                    }
                })
            }
        })
    })
}

function getNationalDetails(id_campaign){
    return new Promise(function(resolve,reject){
        let sql = `
        SELECT COUNT(distinct ca.id_texter) as value, t.state as code, t.state as regionName
        FROM campaign_activity as ca
        JOIN texters as t on ca.id_texter=t.id_texters
        WHERE ca.confirmed=1 AND ca.id_campaign LIKE ?
        group by t.state`
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

function getCampaignRepDetails(id_campaign){
    return new Promise(function(resolve,reject){
        let sql = `
        SELECT COUNT(distinct ca.id_texter) as value, r.name as repName, r.office_name as repOffice, t.state as texterState
        FROM campaign_activity as ca
        JOIN texters as t on ca.id_texter=t.id_texters
        JOIN representatives as r on t.id_texters=r.id_texters
        WHERE ca.confirmed=1 AND ca.id_campaign LIKE ?
        group by r.name`
        pool.getConnection(function(err,connection){
            if(err){
                reject({
                    status:'Failure',
                    err:err,
                    error:true,
                    errorMessage:['Unable to get db connection getCampaignRepDetails']
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
                            errorMessage:['Query issue getCampaignRepDetails']
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

function getCampaignObj(id_campaign){
    return new Promise(function(resolve,reject){
        let sql =`
        SELECT COUNT(distinct ca.id_texter) as countActivity, c.id as id_campaign, c.shortDesc, c.longDesc as letter, c.keywords as keyword, c.name, c.timestamp
        FROM campaigns as c
        LEFT JOIN campaign_activity as ca on c.id=ca.id_campaign
        AND (ca.confirmed = 1 OR ca.confirmed is null)
        WHERE c.id=?
        GROUP BY c.id;`
        pool.getConnection(function(err,connection){
            if(err){
                reject({
                    status:'Failure',
                    err:err,
                    error:true,
                    errorMessage:['Unable to get db connection getCampaignObj']
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
                            errorMessage:['Query issue getCampaignObj']
                        })
                    }else if(results.length == 0){
                        resolve({
                            status:'Success',
                            error:false,
                            id_campaign:null,
                            message:'No campaign details found',
                            results:results
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
function getLetterList(id_campaign){
    return new Promise(function(resolve,reject){
        let sql =`
        SELECT distinct ca.id_texter as id_texter, ca.confirmed, t.firstname as texterFirstName, t.lastname as texterLastName, t.streetname as texterStreet, t.city as texterCity, t.state as texterState, t.zip as texterZip, t.phone as texterPhone, t.streetnumber as texterStreetNumber,
		r.id_rep as id_rep, r.state as repState, r.name as repName, r.addressLine1 as repAddressLine1, r.addressCity as repAddressCity, r.addressState as repAddressState, r.addressZip as repAddressZip,
        cl.lob_id as lob_id, c.longDesc as letter, cl.id_letter_campaign as idCL, c.id as id_campaign, cl.lob_thumbnail as thumbnail
        FROM campaign_activity as ca
        JOIN texters as t on ca.id_texter=t.id_texters
        JOIN representatives r on t.id_texters=r.id_texters
        JOIN campaigns as c on ca.id_campaign=c.id
        LEFT JOIN campaign_letter as cl on (r.id_rep=cl.id_rep AND ca.id_campaign=cl.id_campaign)
        WHERE ca.confirmed=1 AND ca.id_campaign LIKE ?`
        pool.getConnection(function(err,connection){
            if(err){
                reject({
                    status:'Failure',
                    err:err,
                    error:true,
                    errorMessage:['Unable to get db connection getLetterList']
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
                            errorMessage:['Query issue getLetterList']
                        })
                    }else if(results.length == 0){
                        resolve({
                            status:'Success',
                            error:false,
                            id_campaign:id_campaign,
                            message:'No letter list found',
                            results:results
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
module.exports = {
    getCampaignDetails:getCampaignDetails,
    getCampaignKeywordList:getCampaignKeywordList,
    getNationalDetails:getNationalDetails,
    getCampaignObj:getCampaignObj,
    getLetterList:getLetterList,
    getCampaignRepDetails:getCampaignRepDetails
}