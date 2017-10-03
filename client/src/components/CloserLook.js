import React, { Component } from 'react'
import CampaignSubContainer from './CampaignSubContainer'
import CampaignDetails from './CampaignDetails/CampaignDetails'

class CloserLook extends Component {
  render() {
    let id=this.props.match.params.id_campaign
    return(
      <div>
        <div class="campaign-wrap">
            <CampaignDetails id_campaign={id} />
        </div>
        <div class="nav">
          <ul>
          {['All','Day','state'].map(item => <li>{item}</li>)}
          </ul>
        </div>
      </div>
    )
  }
}

export default CloserLook