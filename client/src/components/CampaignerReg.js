import React, { Component } from 'react'

class CampaignReg extends Component {
  render() {
    return(
      <div>
        <div className="reg-box">
          <form>
            <div>
              <label htmlFor="fname">First Name</label>
              <input type="text" name="fname" placeholder="First Name"/>
            </div>
            <div>
              <label htmlFor="lname">Last Name</label>
              <input type="text" name="lname" placeholder="Last Name"/>
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="Username"/>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" placeholder="email"/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password"/>
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    )
  }
}

export default CampaignReg