import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Layout extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/">Log out</Link></li>
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

export default Layout