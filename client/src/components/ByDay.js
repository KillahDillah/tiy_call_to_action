import React, { Component } from 'react'
//import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'
import Nav from './Nav'

class ByDay extends Component {
  render() {
    let id=this.props.match.params.id_campaign
    return(
      <div>
        <h2>Show by day stats here</h2>
        <Nav id_campaign={id} />
      </div>
    )
  }
}

export default Authorize(ByDay)