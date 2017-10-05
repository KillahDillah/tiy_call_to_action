import store from '../store'
import {logoutUser} from '../lib/auth'
// example actions

//import {MY_ACTION} from './actionValues'

export function callLogoutUser() {
  store.dispatch(logoutUser())
}