// if you so choose, you may name your actions and import them here
// for reducing typing errors
import {MY_ACTION} from '../actions/actionValues'

const initialState = {
  foo: 'bar'
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MY_ACTION:
      return {...state, foo: action.payload}
    default:
      return state
  }
}