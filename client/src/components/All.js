import React, { Component } from 'react'
import CampaignDetails from './CampaignDetails/CampaignDetails'
import { Authorize } from '../lib/auth'
//import jwtDecode from 'jwt-decode'

class All extends Component {
  render() {
    return (
            <CampaignDetails id_campaign={this.props.match.params.id_campaign} />
    )
  }
}

export default Authorize(All)