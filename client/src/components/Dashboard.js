import React, { Component } from 'react'
import {Authorize} from '../lib/auth'
import jwtDecode from 'jwt-decode'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Button, Form, Grid, Header, Image, Message, Segment, Container } from 'semantic-ui-react'

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
      <div className="dashboard">
      <Image 
        src="https://d371bzke8qmfhi.cloudfront.net/styles/explore_hero/s3/images/navigation/mountrushmore_1.jpg?itok=4-xvtCQs"
        style={{position:'fixed', opacity:'0.5'}}
        />
        <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
          <Container
          style={{padding:'50px'}}>
          <Segment.Group
            style={{backgroundColor:'white', textAlign:'center'}}>
            <Header as='h1'
              style={{display:'flex', justifyContent:'center'}}>Welcome,{this.state.user.map(function(user){
              return <div key={user.username}>{user.username}</div>
              })}
            </Header>
            <Segment.Group compact
            style={{margin:'1em'}}>
              {this.state.campaigns.map(function(campaign){
                return <Segment color="grey" key={campaign.id} className='result'>
                <div><Link to={`/campaign/${campaign.id}`}>{campaign.name}</Link></div>
                <div>{campaign.shortDesc}</div>
                </Segment>
              })}
            </Segment.Group>
        </Segment.Group>
        </Container>
        </div>

    )
  }
}

export default Authorize(Dashboard)