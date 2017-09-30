import React, { Component } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Letter extends Component {

  state ={
    campaigns:[]
  }

  componentWillMount() {
    let userId = jwtDecode(localStorage.getItem('token')).userId
    console.log(jwtDecode(localStorage.getItem('token')).userId)
    axios.get(`/api/letter/${userId}`)
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
        <div>
        {this.state.campaigns.map(function(campaign){
          return <div key={campaign.id} className='result'>
            <div>
            <p>Date: {campaign.timestamp}</p>
            <p>Name: {campaign.name}</p>
            </div>
            <div>
              <p> To: (congressperson) </p>
            </div>
            <div className="dropdown">
              <select>
                <option value="dear">Dear</option>
                <option value="hello">Hello</option>
              </select>
            </div>
            <div>
              <p> (congressperson) </p>
              <p> The purpose of this letter is to inform you of my support for (campaign). As an elected official, please consider my vote and support for (campaign). </p>
            </div>
            <div className="dropdown">
              <select>
                <option value="sincerely">Sincerely</option>
                <option value="respects">Respects</option>
                <option value="regards">Regards</option>
              </select>
            </div>
            <div>
              <p>{campaign.userId}</p>
            </div>
          </div>

        })}
        </div>
        <button><Link to="/dashboard">Send</Link></button>
      </div>
    )
  }
}

export default Letter