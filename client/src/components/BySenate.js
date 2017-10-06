import React, { Component } from 'react'
//import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'

class BySenate extends Component {
  render() {
    return(
      <div>
        <h2>Show by representative here TODO</h2>
      </div>
    )
  }
}

export default Authorize(BySenate)