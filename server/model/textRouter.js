const Text = require('./messageModel')

function textRouter(phone,textBody,cb,fullUrl){
    let identity= Text.identifyTexter(phone)
    identity.catch(console.log)
    .then(function(identityResults){
        if(!identityResults.registered){
            cb(`You are not registerd yet! ${fullUrl}`)
        }else{
            let texter = identityResults.texter
            if(/^yes$/i.test(textBody)){
                let activeCampaign = Text.checkCampaign(phone)
                activeCampaign.catch(console.log)
                .then(function(campaignResults){
                    if(campaignResults.activeCampaign){
                        let updateCampaign = Text.updateCampaign(campaignResults.id_campaign,texter.id_texters,true)
                        updateCampaign.catch(console.log)
                        .then(function(results){
                            cb(`Successfully confirmed campaign ${campaignResults.id_campaign}`)
                        })
                    }else{
                        cb("No open campaign for you to confirm. Please text back with a campaign keyword to join!")
                    }
                })
            }
            else if(/^no$/i.test(textBody)){
                let activeCampaign = Text.checkCampaign(phone)
                activeCampaign.catch(console.log)
                .then(function(campaignResults){
                    if(campaignResults.activeCampaign){
                        let updateCampaign = Text.updateCampaign(campaignResults.id_campaign,texter.id_texters,false)
                        updateCampaign.catch(console.log)
                        .then(function(results){
                            cb(`You will not be part of campaign ${campaignResults.id_campaign}`)
                        })
                    }else{
                        console.log("Hello")
                        console.log(campaignResults)
                        cb("No open campaign for you to confirm. Please text back with a campaign keyword to join!")
                    }
                })
            }
            else{
                let keywordCheck = Text.findCampaign(textBody)
                keywordCheck.catch(console.log)
                .then(function(results){
                    if(results.campaign_id == null){
                        cb("Your response does not look like a valid campaign. Please text in again with the correct keyword.")
                    }else{
                        let activeCampaign = Text.checkCampaign(phone)
                        activeCampaign.catch(console.log)
                        .then(function(campaignResults){
                            if(campaignResults.activeCampaign){
                                let updateCampaign = Text.updateCampaign(campaignResults.id_campaign,texter.id_texters,false)
                                updateCampaign.catch(console.log)
                                .then(function(results){
                                    console.log("Removed campaign from texter",results)
                                })
                            }
                            let joinCampaign = Text.joinCampaign(results.campaign_id,texter.id_texters)
                            joinCampaign.catch(console.log)
                            .then(function(results){
                                cb(`Text back 'Yes' to join campaign ${results.id_campaign}`)
                            })
                        })
                    }
                })
            }
        }
    })
}
module.exports = {
    textRouter
}