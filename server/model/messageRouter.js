const Text = require('./messageModel')

/**
 * This performs the logic of what to do with an incoming text. Relies heavily on promises in messageModel
 * @param {* Phone number in the format Twilio sends +188877766666} phone 
 * @param {* Body of the text} textBody 
 * @param {* Message back to the texter is sent to this callback} cb 
 * @param {* Should come from 'req.host' on the Express side, used for registration link} fullUrl 
 */
function messageRouter(phone,textBody,cb,fullUrl){
    //First check to see if the user has texted in before
    let identity= Text.identifyTexter(phone)
    identity.catch(console.log)
    .then(function(identityResults){
        if(!identityResults.registered){
            //Registration url comes in from Express route
            cb(`You are not registerd yet! ${fullUrl}`)
        }else{
            //This object stores the needed id_texters key
            let texter = identityResults.texter
            //First check on the textBody is to see if it's in response to an open campaign
            if(/^yes$/i.test(textBody)){
                let activeCampaign = Text.checkCampaign(phone)
                activeCampaign.catch(console.log)
                .then(function(campaignResults){
                    //If the campaign is open, and a yes was sent, it is confirmed
                    if(campaignResults.activeCampaign){
                        let updateCampaign = Text.updateCampaign(campaignResults.id_campaign,texter.id_texters,true)
                        updateCampaign.catch(console.log)
                        .then(function(results){
                            cb(`Successfully confirmed campaign ${campaignResults.id_campaign}`)
                        })
                    }else{
                        //No campaign found
                        cb("No open campaign for you to confirm. Please text back with a campaign keyword to join!")
                    }
                })
            }
            //Similar function to a yes coming in
            else if(/^no$/i.test(textBody)){
                let activeCampaign = Text.checkCampaign(phone)
                activeCampaign.catch(console.log)
                .then(function(campaignResults){
                    if(campaignResults.activeCampaign){
                        let updateCampaign = Text.updateCampaign(campaignResults.id_campaign,texter.id_texters,false)
                        //Update campaign marks the campaign as no longer active
                        updateCampaign.catch(console.log)
                        .then(function(results){
                            cb(`You will not be part of campaign ${campaignResults.id_campaign}`)
                        })
                    }else{
                        cb("No open campaign for you to confirm. Please text back with a campaign keyword to join!")
                    }
                })
            }
            //After checking for yes/no, it checks for a keyword
            else{
                let keywordCheck = Text.findCampaign(textBody)
                keywordCheck.catch(console.log)
                .then(function(results){
                    //If no campaign is returned, message is sent back asking them to text in again
                    if(results.campaign_id == null){
                        cb("Your response does not look like a valid campaign. Please text in again with the correct keyword.")
                    }else{
                        //If a campaign is found, we first close out any other campaigns they may have left open, then add them to it
                        let activeCampaign = Text.checkCampaign(phone)
                        activeCampaign.catch(console.log)
                        .then(function(campaignResults){
                            if(campaignResults.activeCampaign){
                                //This action removes texters from open campaigns
                                let updateCampaign = Text.updateCampaign(campaignResults.id_campaign,texter.id_texters,false)
                                updateCampaign.catch(console.log)
                                .then(function(results){
                                    console.log("Removed campaign from texter",results)
                                })
                            }
                            //Joins them to a campaign, router is finished
                            //TODO: Check and see if they have already joined the campaign previously
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
    messageRouter
}