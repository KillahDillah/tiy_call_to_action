import React, { Component } from 'react'
import {Authorize} from '../lib/auth'
import jwtDecode from 'jwt-decode'
import {Link} from 'react-router-dom'
import axios from 'axios'

function getMetrics(userId){
  return axios.get(`/api/metrics/${userId}`)
}

function getUsername(userId){
  return axios.get(`api/user/${userId}`)
}

class Dashboard extends Component {

  state= {
    campaigns:[], 
    user:[]
  }

  componentWillMount() {
    let userId = jwtDecode(localStorage.getItem('token')).userId
    console.log(jwtDecode(localStorage.getItem('token')).userId)

    axios.all([getMetrics(userId),getUsername(userId)])
    .then(axios.spread((campaigns,user) => {
      console.log(campaigns,user)
      this.setState({
        campaigns: campaigns.data,
        user: user.data
      })
    }))
  }

  render() {
    return(
      <div className="welcome">
        <h2 className="align-center">Welcome</h2> {this.state.user.map(function(user){
          return <div key={user.username}><h2>{user.username}</h2></div>
        })}
        <div>
        {this.state.campaigns.map(function(campaign){
          return <div key={campaign.id} className='result'>
          <div><Link to={`/campaign/${campaign.id}`}>{campaign.name}</Link></div>
          <div>{campaign.shortDesc}</div>
          </div>
          })}
        </div>
      </div>
    )
  }
}

export default Authorize(Dashboard)