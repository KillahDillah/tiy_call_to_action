import React, { Component } from 'react'
//import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'

class ByState extends Component {
  render() {
    return(
      <div>
        <h2>Show stats by State here</h2>
      </div>
    )
  }
}

export default Authorize(ByState)