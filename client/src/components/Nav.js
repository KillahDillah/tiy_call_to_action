import React, { Component } from 'react'
import ListItem from './ListItem'
import {Authorize} from '../lib/auth'
import {Button} from 'semantic-ui-react'

class Nav extends Component {

  render() {
    let navItems = [{
      name: 'All',
      param: 'all'
    },
    {
      name: 'National',
      param: 'national'
    },
    {
      name: 'By Representative',
      param: 'representative'
    },
    {
      name: 'Update Texters',
      param: 'updatetexters'
    },
    {
      name: 'View Letter',
      param: 'letter'
    },
    {
      name: 'Send Letter',
      param: 'sendletter'
    }]
    return (
      <div className="nav">
        <ul>
          {navItems.map(item =>
            <li key={item.param}>
              <Button><ListItem obj={item} id_campaign={this.props.id_campaign} /></Button>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Authorize(Nav)