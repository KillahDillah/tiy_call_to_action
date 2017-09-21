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
              <li><Link to="/">Home Page</Link></li>
            </ul>
          </nav>
        </header>
        {/* Rendering of the page below */}
        {this.props.children}
        <footer>
          &copy; 2017 Iron Yard
        </footer>
      </div>
    )
  }
}

export default Layout