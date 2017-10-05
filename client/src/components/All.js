import React, { Component } from 'react'
import CampaignDetails from './CampaignDetails/CampaignDetails'
import Nav from './Nav'
import { Authorize } from '../lib/auth'
import { Grid, Menu, Segment } from 'semantic-ui-react'
//import jwtDecode from 'jwt-decode'

class All extends Component {
  render() {
    return (
            <CampaignDetails id_campaign={this.props.match.params.id_campaign} />
    )
  }
}

export default Authorize(All)