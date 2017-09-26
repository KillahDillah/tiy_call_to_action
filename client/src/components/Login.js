import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Login extends Component {
  render() {
    return(
      <div className="login-wrap">
        <div>
          <label htmlFor="c-login">Username</label>
          <input type="text" name="c-login" placeholder="Campaign Login"/>
        </div>
        <div>
          <label htmlFor="c-password">Password</label>
          <input type="password" name="c-password"/>
        </div>
        <Link to='/registration'>Register</Link>
      </div>
    )
  }
}

export default Login