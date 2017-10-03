import React, { Component } from 'react'
import CampaignSubContainer from './CampaignSubContainer'
import CampaignDetails from './CampaignDetails/CampaignDetails'
import Nav from './Nav'
import {Authorize} from '../lib/auth'
import jwtDecode from 'jwt-decode'

class All extends Component {
  render() {
    let id=this.props.match.params.id_campaign
    return(
      <div>
        <div className="campaign-wrap">
            <CampaignDetails id_campaign={id} />
        </div>
        <Nav id_campaign={id}/>
      </div>
    )
  }
}

export default Authorize(All)