import React, { Component } from 'react'

class NewUser extends Component {

  handleFName=(e)=>{
    this.setState({
      e.target.value
    })
  }

  handleLName=(e)=>{
    this.setState({
      e.target.value
    })
  }

  handleEmail=(e)=>{
    this.setState({
      e.target.value
    })
  }

  render() {
    return(
      <div>
        <form onSubmit={this.NewUserForm}>
          <div className="name">
            <input type="text" onChange={this.handleFName} placeholder="First Name" />
            <imput type="text" onChange={this.handleLName} placeholder="Last Name" />
          </div>
          <div>
            <input type="email" onchange={this.handleEmail} placeholder="Email" />
          </div>
        </form>
      </div>
    )
  }
}

export default NewUser