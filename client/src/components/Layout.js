import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {logoutUser} from '../lib/auth'
import {connect} from 'react-redux'

class Layout extends Component {

  logout =(e)=> {
    this.props.dispatch(logoutUser())
  }


  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link onClick={this.logout} to="/login">Log out</Link></li>
          </ul>
        </nav>
        {/* Rendering of the page below */}
        {this.props.children}
        <footer>
         <div className="copyright">
              &copy; 2017 by the Call to Action Team
          </div>
        </footer>
      </div>
    )
  }
}

function mapStateToProps(appState) {
    const {isAuthenticated, errorMessage, isFetching} = appState.auth

   return {
      isAuthenticated,
      isFetching,
      errorMessage
    }
  }

  export default connect(mapStateToProps)(Layout)