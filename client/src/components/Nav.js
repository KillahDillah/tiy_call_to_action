import React, { Component } from 'react'
import ListItem from './ListItem'
import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'
import {Button} from 'semantic-ui-react'

class Nav extends Component {
  
  render() {
    let navItems = ['All','National','State','Senate','Update']
    return(
      <div className="nav">
          <ul>
          {navItems.map(name => 
            <li key={name}>
            <Button><ListItem name={name} id_campaign={this.props.id_campaign}/></Button>
            </li>
            )}
          </ul>
        </div>
    )
  }
}

export default Authorize(Nav)