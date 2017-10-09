const Lob = require('lob')(process.env.LOB_API_KEY)
const pool = require('../lib/db.js')
const Campaign = require('./campaignModel')

function sendLetters(id_campaign){
    return new Promise(function(resolve,reject){
        let arrHolder = []
        let letterlist = Campaign.getLetterList(id_campaign)
        letterlist.catch(console.log)
        .then(function(data){
            let list = data.results
            list.forEach(function(element) {
                if(!element.lob_id){
                    let letter = sendLetter(element)
                    arrHolder.push(letter)
                }
            }, this);
        })
        Promise.all(arrHolder).catch(reject).then(resolve)
    })
}

function sendLetter(item){
    return Lob.addresses.create({
        name: `${item.texterFirstName} ${item.texterLastName}`,
        email: item.texterEmail,
        phone: item.texterPhone,
        address_line1: `${item.texterStreetNumber} ${item.texterStreet}`,
        address_line2: '',
        address_city: item.texterCity,
        address_state: item.texterState,
        address_zip: item.texterZip,
        address_country: 'US'
      })
      .then(function (address) {
        return Lob.letters.create({
          description: 'My First Letter',
          to: address.id,
          from: {
            name: item.repName,
            address_line1: item.repAddressLine1,
            address_line2: '',
            address_city: item.repAddressCity,
            address_state: item.repAddressState,
            address_zip: item.repAddressZip,
            address_country: 'US'
          },
          file: 'tmpl_72386c1873a7db6',
          merge_variables: {
            repName: item.repName,
            body:item.letter,
            yourName:`${item.texterFirstName} ${item.texterLastName}`,
            address1:item.texterStreet,
            city:item.texterCity,
            state:item.texterState,
            zip:item.texterZip
          },
          color: false
        });
      })
      .then(function (letter) {
        return new Promise(function(resolve,reject){
            let sql = `
            INSERT INTO campaign_letter ( id_campaign, id_texter, lob_id, lob_url, lob_thumbnail, lob_to, lob_from, lob_deliveryDate, id_rep)
            VALUES (?,?,?,?,?,?,?,?,?);`
            pool.getConnection(function (err, connection) {
                if(err){
                    reject({
                        status: 'Failure',
                        error: true,
                        errorMessage: ['Unable to connect to db to update letter'],
                        err:err
                    })
                }else{
                    connection.query(sql,[item.id_campaign,item.id_texter,letter.id,letter.url,letter.thumbnails[0].large,letter.to.id,letter.from.id,letter.expected_delivery_date,item.id_rep],function(err,results,fields){
                        connection.release()
                        if(err){
                            reject({
                                status:'Failure',
                                error:true,
                                errorMessage: ['Problem updating records for letter sent'],
                                err:err
                            })
                        }else{
                            resolve({
                                status:'Success',
                                id_campaign:item.id_campaign,
                                id_texter: item.id_texter,
                                letterId:results.insertId
                            })
                        }
                    })
                }
            })
        })
      })
      .catch(function (err) {
        console.log(err);
      });
}

// // Create the address
// Lob.addresses.create({
//     name: 'Robin Joseph',
//     email: 'test@gmail.com',
//     phone: '123456789',
//     address_line1: '123 Test Street',
//     address_line2: 'Unit 199',
//     address_city: 'Chicago',
//     address_state: 'IL',
//     address_zip: '60012',
//     address_country: 'US'
//   })
//   .then(function (address) {
//     return Lob.letters.create({
//       description: 'My First Letter',
//       to: address.id,
//       from: {
//         name: 'Test Person',
//         address_line1: '123 Test Street',
//         address_line2: 'Unit 200',
//         address_city: 'Chicago',
//         address_state: 'IL',
//         address_zip: '60012',
//         address_country: 'US'
//       },
//       file: 'tmpl_72386c1873a7db6',
//       merge_variables: {
//         repName: 'Dean',
//         body:'This will be a text body. Small change.',
//         yourName:'Leah',
//         address1:'123 Fake Street',
//         city:'Las Vegas',
//         state:'NV',
//         zip:'89148'
//       },
//       color: false
//     });
//   })
//   .then(function (letter) {
//     console.log('The Lob API responded with this letter object: ', letter);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

module.exports = {
    sendLetters:sendLetters
}
