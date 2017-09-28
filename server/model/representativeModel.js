const axios = require('axios')
const config = require('config')
//const apiKey = config.get('google.apiKey')
const Querystring = require('querystring');
const pool = require('../lib/db.js')


let url = 'https://www.googleapis.com/civicinfo/v2/representatives?'

function findRepresentatives(address) {
    let params = {
        levels: 'country',
        roles: ['legislatorLowerBody', 'legislatorUpperBody'],
        address: address,
        key: "AIzaSyAugniaitAfv6TASa1c_WV3ac-Lvk8EFWg"
    }
    return axios.get(url + '?' + Querystring.stringify(params))
        .then(response => response.data)
        .catch(function (error) {
            console.log(error);
        });
}
function createRepsArray(googleBlob) {
    let reps = []
    googleBlob.offices.forEach(function (office, i, arr) {
        office.officialIndices.forEach(function (item) {
            let rep = {
                state:googleBlob.normalizedInput.state,
                office:
                {
                    name: office.name,
                    divisionId: office.divisionId,
                    roles: office.roles
                },
                representative: googleBlob.officials[item]
            }
            reps.push(rep)
        })
    })
    return reps
}

function storeReps(reps,id_texters){
    return new Promise(function(resolve,reject){
    let storagePromise = reps.map(function(rep){
        return new Promise(function(resole,reject){
            let arr = [
                id_texters,
                rep.state,
                rep.office.name,
                rep.office.divisionId,
                rep.office.roles[0],
                rep.representative.name,
                rep.representative.address.line1,
                rep.representative.address.line2 || "",
                rep.representative.address.city,
                rep.representative.address.state,
                rep.representative.address.zip
            ]
            let sql = `
            INSERT INTO representatives (id_texters,state,office_name,office_id,roles,name,addressLine1,addressLine2,addressCity,addressState,addressZip)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,)
            `
            pool.getConnection(function (err,connection){
                if(err){
                    console.log("store reps db connection",err)
                    reject({status:'Failure',err:err})
                }else{
                    connection.query(sql,arr,function(err,results,fields){
                        connection.release()
                        if(err){
                            reject({
                                status: 'Failure',
                                error: true,
                                errorMessage: ['Unable to store rep'],
                                err:err
                            })
                        }
                        else{
                            resolve({
                                status:'Success',
                                error:false,
                                rowId:results.insertId
                            })
                        }
                    })
                }
            })
        })
    })
    let arrResults = Promise.all(storagePromise)
    arrResults.catch(reject)
    .then(resolve)
})
}
//findRepresentatives("10146 Campo Tizzoro Ave, Las Vegas, NV, 89147")

module.exports = {
    findRepresentatives:findRepresentatives,
    createRepsArray:createRepsArray,
    storeReps:storeReps
}