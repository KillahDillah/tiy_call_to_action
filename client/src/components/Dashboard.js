import React, { Component } from 'react'
import {Authorize} from '../lib/auth'

class Dashboard extends Component {
  render() {
    return(
      <div id="footer" class="wrapper">
        <p>Put a dashboard of active campaigns here.</p>
      </div>
    )
  }
}

export default Authorize(Dashboard)