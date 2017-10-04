import React, { Component } from 'react'
import ListItem from './ListItem'
import { Authorize } from '../lib/auth'

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
              <button><ListItem obj={item} id_campaign={this.props.id_campaign} /></button>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Authorize(Nav)