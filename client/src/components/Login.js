import React, { Component } from 'react'
import {loginUser, logoutUser} from '../lib/auth'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'


//Clean up CSS and div tags to be more clear

class Login extends Component {
  state = {
    username:'',
    password:''
  }
  componentWillMount() {
    this.props.dispatch(logoutUser())
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(loginUser({username: this.state.username, password:this.state.password}))
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  componentWillReceiveProps(props){
    if (props.isAuthenticated){
      props.history.push('/dashboard')
    }
  }

  render() {
    return (
      <div className='login-form'>
      <Image 
        src="https://d371bzke8qmfhi.cloudfront.net/styles/explore_hero/s3/images/navigation/mountrushmore_1.jpg?itok=4-xvtCQs"
        style={{position:'fixed', opacity:'0.5'}}
        />
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='grey' textAlign='center'>
          <Image src='/logo.png' />
          {' '}Log-in to your account
        </Header>
        <Form size='large' onSubmit={this.handleSubmit}>
          <Segment stacked>
            <Form.Input onChange={this.handleChange}
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Username'
              name='username'
            />
            <Form.Input onChange={this.handleChange}
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
            />

            <Button type='submit'color='grey' fluid size='large'>Login</Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href='/registration'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
      )
    }
  }

  function mapStateToProps(appState) {
    const {isAuthenticated, errorMessage, isFetching} = appState.auth

   return {
      isAuthenticated,
      isFetching,
      errorMessage
    }
  }

  export default connect(mapStateToProps)(Login)