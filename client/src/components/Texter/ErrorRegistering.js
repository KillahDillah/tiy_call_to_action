import React, { Component } from 'react'
import { Container, Menu, Image } from 'semantic-ui-react'
class ErrorRegistering extends Component {
    render() {
        return (
                <Container>
                <Menu>
                <Menu.Item header>
                    <Image
                        size='mini'
                        src='/logo_small.png'
                        style={{ marginRight: '1.5em' }}
                    />
                    Text to Action
                </Menu.Item>
            </Menu>
                <h3>Error</h3>
                <br/>
                <p>There was an issue registering your phone number.</p>
                </Container>	
                )
    }
}

export default ErrorRegistering