import React, { Component } from 'react'
import {Authorize} from '../lib/auth'
import jwtDecode from 'jwt-decode'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Dashboard extends Component {

  state= {
    
  }

  componentWillMount() {
    console.log(jwtDecode(localStorage.getItem('token')))
    let userId = jwtDecode(localStorage.getItem('token')).userId
    console.log("userId",userId)
    axios.get(`/api/metrics/${userId}`)
    .then(results => {
      console.log("results from /api/metrics",results.data)
    })
  }

  then(results=>{
    this.setState = results.data.results
  })


  render() {
    return(
      <div className="wrapper">
        <div id="footer" class="wrapper">
        <Link to="/new-campaign">New Campaign</Link>
          <div class="inner">
            <section>
              <div class="box">
                <div class="content">
                  <h2 class="align-center">Your active campaigns:</h2>
                  <hr />
                </div>
              </div>
            </section>
            <div class="copyright">
              &copy; 2017 by the Call to Action Team
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Authorize(Dashboard)