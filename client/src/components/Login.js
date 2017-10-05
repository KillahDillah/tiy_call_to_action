import React, { Component } from 'react'
import {loginUser, logoutUser} from '../lib/auth'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'
import { Divider } from 'semantic-ui-react'


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
      <div className="login_wrap wrapper">
        <div className="inner">
          <section>
            <div className="box">
              <div className="content">
                <h2 className="align-center">Sign in to Text to Action</h2>
                <hr />
                <form onSubmit={this.handleSubmit}>
                  <div className="login-box">
                    <div className="login-name">
                      <label htmlFor="name">Username</label>
                      <input onChange={this.handleChange} type="text" name="username" value={this.state.username} />
                    </div>
                    <div className="login-name">
                      <label htmlFor="password">Password</label>
                      <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
                    </div>
                    <Button compact value="login" type="submit">Login</Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="box">
              <div className="reg-content">
                <p>New to Text to Action?</p>
                <Link to='/registration'>Register</Link>
              </div>
            </div>
          </section>
        </div>
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