import React, { Component } from 'react'
import ListItem from './ListItem'
import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'

class Nav extends Component {
  
  render() {
    let navItems = ['All','National','State','Senate','Update']
    return(
      <div className="nav">
          <ul>
          {navItems.map(name => 
            <li key={name}>
            <button><ListItem name={name} id_campaign={this.props.id_campaign}/></button>
            </li>
            )}
          </ul>
        </div>
    )
  }
}

export default Authorize(Nav)