import React, { Component } from 'react'
//import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'
import Nav from './Nav'

class ByDay extends Component {
  render() {
    return(
      <div>
        <h2>Show by day stats here</h2>
      </div>
    )
  }
}

export default Authorize(ByDay)