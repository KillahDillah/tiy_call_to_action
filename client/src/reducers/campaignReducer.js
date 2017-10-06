// if you so choose, you may name your actions and import them here
// for reducing typing errors
import {SET_CAMPAIGN} from '../actions/actionValues'

const initialState = {
  campaign: {
    countActivity:0,
    id_campaign:'',
    shortDesc:'',
    letter:'',
    keyword:'',
    name:'',
    timestamp:''
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CAMPAIGN:
      return {...state, campaign: action.payload}
    default:
      return state
  }
}