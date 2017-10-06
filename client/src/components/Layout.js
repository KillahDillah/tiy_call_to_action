import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callLogoutUser } from '../actions/campaignAction'
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment, Icon } from 'semantic-ui-react'

class Layout extends Component {

  logout = (e) => {
    callLogoutUser()
  }


  render() {
    return (
      <div>
        <Menu>
          <Container>
            <Menu.Item header as={Link} to="/">
              <Image
                size='mini'
                src='/logo_small.png'
                style={{ marginRight: '1.5em' }}
              />
              Text to Action
      </Menu.Item>
            <Menu.Item as={Link} to="/">Home</Menu.Item>
            <Menu.Item as={Link} to="/newcampaign" name="newCampaign"><Icon name="add" />New Campaign</Menu.Item>
          </Container>
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/login" name="logout" onClick={this.logout}><Icon name="sign out" />Sign Out</Menu.Item>
          </Menu.Menu>
        </Menu>
        {/* Rendering of the page below */}
        {this.props.children}
      
      </div>
    )
  }
}

export default Layout