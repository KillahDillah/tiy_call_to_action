import React, { Component } from 'react'
import {Authorize} from '../lib/auth'
import jwtDecode from 'jwt-decode'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { Header, Segment, Container, Card } from 'semantic-ui-react'

function getMetrics(userId){
  return axios.get(`/api/metrics/${userId}`)
}

function getUsername(userId){
  return axios.get(`api/user/${userId}`)
}

class Dashboard extends Component {

  state= {
    campaigns:[], 
    user:{
      lname:'',
      fname:''
    }
  }

  componentWillMount() {
    let userId = jwtDecode(localStorage.getItem('token')).userId
    console.log(jwtDecode(localStorage.getItem('token')).userId)

    axios.all([getMetrics(userId),getUsername(userId)])
    .then(axios.spread((campaigns,user) => {
      console.log(campaigns,user)
      this.setState({
        campaigns: campaigns.data,
        user: user.data[0]
      })
    }))
  }

  render() {
    return(
      <div className="dashboard">
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
                style={{display:'flex', justifyContent:'center', marginTop:'1em'}}>{`Welcome ${this.state.user.fname} ${this.state.user.lname}!`}
              </Header>
              <Container
              style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around', padding:'0 1em 1em'}}>
                <Card.Group
                style={{justifyContent:'center',display:'flex'}}>
                {this.state.campaigns.map(campaign => {
                  return (
                    <Card color='grey' className='card'  key={campaign.id}>
                      <Card.Content
                        header={campaign.name}
                        description={campaign.shortDesc}
                        as={Link}
                        to={`/campaign/${campaign.id}`}
                      />
                    </Card>
                  )
                })} 
                </Card.Group>
              </Container>
            </Segment.Group>
          </Container>
        </div>

    )
  }
}

export default Authorize(Dashboard)