import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {callLogoutUser} from '../actions/campaignAction'
import {Icon} from 'semantic-ui-react'
//import {connect} from 'react-redux'

class Layout extends Component {

  logout =(e)=> {
    callLogoutUser()
  }


  render() {
    return (
      <div>
        <div id="navy">
          <header className="nav">
            <ul>
              <li><Link to="/dashboard">Text to Action</Link></li>
              <div className="top-right">
                <li><Link to="/new-campaign"><Icon name='plus'/></Link></li>
                <li><Link onClick={this.logout} to="/login"><Icon name='lock'/></Link></li>
              </div>
            </ul>
          </header>
        </div>
        {/* Rendering of the page below */}
        {this.props.children}
        <footer>
         <div className="copyright">
              <p>&copy; 2017 by the Text to Action Team</p>
          </div>
        </footer>
      </div>
    )
  }
}

export default Layout