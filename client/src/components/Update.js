import React, { Component } from 'react'
import UpdateTexters from './UpdateTexters'
//import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'


class Update extends Component {
  render() {
    return(
      <div>
        <div className="campaign-wrap">
            <UpdateTexters id_campaign={this.props.match.params.id_campaign} />
        </div>
      </div>
    )
  }
}

export default Authorize(Update)