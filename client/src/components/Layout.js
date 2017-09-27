import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Layout extends Component {
  render() {
    return (
      <div>
        {/* this is just an example layout*/}
        <header>
          <nav>
            <ul>
              
            </ul>
          </nav>
        </header>
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