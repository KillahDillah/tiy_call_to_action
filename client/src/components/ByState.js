import React, { Component } from 'react'
import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'

class ByState extends Component {
  render() {
    return(
      <div>

      </div>
    )
  }
}

export default Authorize(ByState)