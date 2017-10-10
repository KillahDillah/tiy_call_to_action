import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callLogoutUser } from '../actions/campaignAction'
import { Container, Image, Menu, Icon} from 'semantic-ui-react'

class Layout extends Component {

  logout = (e) => {
    callLogoutUser()
  }


  render() {
    return (
      <div>
        <Menu
        style={{marginBottom:'0'}}>
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
        {/*<Segment vertical style={{backgroundColor:'white',padding: '0em 0em' }}>
                  <Container textAlign='center'>
                    <List horizontal inverted divided link>
                      <List.Item style={{color:'black'}}>&copy;Text to Action</List.Item>
                    </List>  
                  </Container>
                </Segment>*/}
      </div>
    )
  }
}

export default Layout