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
    let storagePromise = reps.map(function(rep){
        return new Promise(function(resole,reject){
            let sql = `
            INSERT INTO representatives (id_texters,)
            VALUES (?,?,?,?,?,?,?,?)
            `
            pool.getConnection(function (err,connection){
                if(err){
                    console.log("store reps db connection",err)
                    reject({status:'Failure',err:err})
                }else{
                    conncetion.query(sql,[],function(err,results,fields){
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
}
//findRepresentatives("10146 Campo Tizzoro Ave, Las Vegas, NV, 89147")

module.exports = {
    findRepresentatives:findRepresentatives,
    createRepsArray:createRepsArray
}