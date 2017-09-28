const BASE_URL = '/api'

function callApi(endpoint, method, authenticated, body) {
  
  let token = localStorage.getItem('token') || null
  let config = {}
  var headers = new Headers()
  headers.append('Authorization', `Bearer ${token}`)
  headers.append('Content-Type', 'application/json')

  if(authenticated) {
    if(token) {
      config = {
        headers,
        method,
        body: JSON.stringify(body)
      }
    } else {
      throw new Error("No Token Saved!")
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response => response.json())
    .then(({body, response}) => {
      if (!response.ok) {
        return Promise.reject(body)
      } 
      return body
    })
    .catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API')

export const apiMiddleware = store => next => action => {
  
  const callAPI = action[CALL_API]
  
  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }
  
  let { endpoint, method, types, authenticated, body } = callAPI
  
  const [ requestType, successType, errorType ] = types
  
  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, method, authenticated, body).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}
