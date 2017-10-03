import React, { Component } from 'react'
import UpdateTexters from './UpdateTexters'
import Nav from './Nav'
import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'


class Update extends Component {
  render() {
    let id=this.props.match.params.id_campaign
    return(
      <div>
        <div className="campaign-wrap">
            <UpdateTexters id_campaign={id} />
        </div>
        <Nav id_campaign={id}/>
      </div>
    )
  }
}

export default Authorize(Update)