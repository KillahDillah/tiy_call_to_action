import React, { Component } from 'react'
import {Authorize} from '../lib/auth'
import jwtDecode from 'jwt-decode'
import {Link} from 'react-router-dom'

class Dashboard extends Component {
  componentWillMount() {
    console.log(jwtDecode(localStorage.getItem('token')))
    let userId = jwtDecode(localStorage.getItem('token')).userId
    console.log("userId",userId)
  }
  render() {
    return(
      <div className="wrapper">
        <p>Put a dashboard of active campaigns here.</p>
        <Link to="/new-campaign">New Campaign</Link>
      </div>
    )
  }
}

export default Authorize(Dashboard)