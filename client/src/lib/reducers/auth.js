import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../actions/auth'
import jwtDecode from 'jwt-decode'

function checkAuth() {
  if (localStorage.getItem('token')) {
    const token = jwtDecode(localStorage.getItem('token'))
    const now = Math.floor(new Date().getTime() / 1000)

    return token.exp > now
  }
  return false
}

const initialState = {
  isAuthenticated: checkAuth(),
  errorMessage: '',
  user: {},
  isFetching: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching:true,
        isAuthenticated: false,
        user: action.creds
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated
      }
    default:
      return state
  }
}
