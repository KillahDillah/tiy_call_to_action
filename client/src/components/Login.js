import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Login extends Component {

  constructor(){
    super()
    this.state={
      username:"",
      password:""
    }
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  submitForm=(e)=>{
      e.preventDefault()
      axios.post('/api/Login',{
        username: this.state.username,
        password: this.state.password
      }).then(resp => {
      this.props.history.push('/Dashboard')
    })
  }

  render(){
    return(
      <div className="login-wrap">
        <form onSubmit={this.submitForm}>
          <div>
            <label htmlFor="c-login">Username</label>
            <input onChange={this.handleChange} type="text" name="username" value={this.state.username} placeholder="Campaign Login"/>
          </div>
          <div>
            <label htmlFor="c-password">Password</label>
            <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
          </div>
          <button type="submit">Login</button>
        </form>
      <Link to='/registration'>Register</Link>
      </div>
    )
  }
}

export default Login