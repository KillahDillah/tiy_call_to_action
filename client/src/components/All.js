import React, { Component } from 'react'
import CampaignDetails from './CampaignDetails/CampaignDetails'
import { Authorize } from '../lib/auth'
import {Container} from 'semantic-ui-react'
//import jwtDecode from 'jwt-decode'

class All extends Component {
  render() {
    return (
      <Container
        style={{marginTop:'1em'}}>
        <CampaignDetails id_campaign={this.props.match.params.id_campaign} />
      </Container>
    )
  }
}

export default Authorize(All)