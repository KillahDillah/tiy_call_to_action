import {createStore, combineReducers} from 'redux'

// import reducers here
import appReducer from './reducers/app'

const rootReducer = combineReducers({
  app: appReducer
})

const store = createStore(rootReducer)

export default store

/*
  if you will only be using a single reducer, here is an example:


  import appReduver from './reducers/app'

  const store = createStore(appReducer)

  export default store
*/