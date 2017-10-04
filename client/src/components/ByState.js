import React, { Component } from 'react'
//import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'
import Nav from './Nav'

class ByState extends Component {
  render() {
    let id=this.props.match.params.id_campaign
    return(
      <div>
        <h2>Show stats by State here</h2>
        <Nav id_campaign={id} />
      </div>
    )
  }
}

export default Authorize(ByState)