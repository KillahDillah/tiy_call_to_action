import React, { Component } from 'react'
import {Authorize} from '../lib/auth'
import { Link } from 'react-router-dom'
import { Menu} from 'semantic-ui-react'


class Nav extends Component {
  state = { activeItem: 'Details' }
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    let navItems = [{
      name: 'Details',
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
      <Menu vertical tabular fluid>
      {navItems.map(item =>
        <Menu.Item className='nav' as={Link} to={'/campaign/'+this.props.match.params.id_campaign+'/'+item.param} key={item.param} onClick={this.handleItemClick} active={activeItem === item.name} style={backgroundColor:'grey'} name={item.name}>
          {item.name}
        </Menu.Item>
      )}
      </Menu>
      </div>
    )
  }
}

export default Authorize(Nav)