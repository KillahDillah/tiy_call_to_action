import React, { Component } from 'react'
import {loginUser, logoutUser} from '../lib/auth'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


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
      <div id="footer" className="wrapper">
        <div className="inner">
          <section>
            <div className="box">
              <div className="content">
                <h2 className="align-center">Call to Action</h2>
                <hr />
                <form onSubmit={this.handleSubmit}>
                  <div className="field half first">
                    <label htmlFor="name">Username</label>
                    <input onChange={this.handleChange} type="text" placeholder="username" name="username" value={this.state.username} />
                  </div>
                  <div className="field half">
                    <label htmlFor="password">Password</label>
                    <input onChange={this.handleChange} type="password" placeholder="password" name="password" value={this.state.password} />
                  </div>
                  <ul className="actions align-center">
                    <li><input value="login" className="button special" type="submit" /></li>
                    <li><Link to='/registration'>Register</Link></li>
                  </ul>
                </form>
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