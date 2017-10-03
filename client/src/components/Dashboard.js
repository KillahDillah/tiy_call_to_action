import React, { Component } from 'react'
import {Authorize} from '../lib/auth'
import jwtDecode from 'jwt-decode'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Dashboard extends Component {

  state= {
    campaigns:[]
  }

  componentWillMount() {
    let userId = jwtDecode(localStorage.getItem('token')).userId
    console.log(jwtDecode(localStorage.getItem('token')).userId)
    axios.get(`/api/metrics/${userId}`)
    .then(results =>{
      console.log (results)
      this.setState({
        campaigns: results.data
      })
    })
  }

  render() {
    return(
      <div>
        <Link to="/new-campaign">New Campaign</Link>
        <h2 className="align-center">Your active campaigns:</h2>
        <div>
        {this.state.campaigns.map(function(campaign){
          return <div key={campaign.id} className='result'>
          <div><Link to={`/campaign/${campaign.id}`}>{campaign.name}</Link></div>
          <div><Link to={`/letter/${campaign.id}`}>Letter</Link></div>
          <div>{campaign.shortDesc}</div>
          </div>
          })}
        </div>
      </div>
    )
  }
}

export default Authorize(Dashboard)