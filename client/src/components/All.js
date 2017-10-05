import React, { Component } from 'react'
import CampaignDetails from './CampaignDetails/CampaignDetails'
import Nav from './Nav'
import { Authorize } from '../lib/auth'
import { Grid, Menu, Segment } from 'semantic-ui-react'
//import jwtDecode from 'jwt-decode'

class All extends Component {
  render() {
    let id = this.props.match.params.id_campaign
    return (
      <Grid>
        <Grid.Column width={3}>
          <Nav id_campaign={id} />
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment>
            <CampaignDetails id_campaign={id} />
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default Authorize(All)