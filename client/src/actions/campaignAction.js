import store from '../store'
// example actions

import {MY_ACTION} from './actionValues'

export function getFoo() {
  fetch('/api/foo')
  .then(resp => resp.json())
  .then(resp => {
    console.log(resp)
    store.dispatch({
      type: MY_ACTION,
      payload: resp.foo
    })
  })
}