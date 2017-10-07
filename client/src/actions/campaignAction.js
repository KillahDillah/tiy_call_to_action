import store from '../store'
import {logoutUser} from '../lib/auth'
import axios from 'axios'
// example actions

import {SET_CAMPAIGN} from './actionValues'

export function callLogoutUser() {
  store.dispatch(logoutUser())
}

export function setCampaignDetails(id_campaign){
  axios.get(`/api/campaign/${id_campaign}/obj`)
  .catch(console.log)
  .then(response => {
    let campaign= response.data.results[0]
    store.dispatch(
      {type:SET_CAMPAIGN,
        payload:campaign})
  }) 
}