import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Registered extends Component {
  render() {
    return(
      <div>
        Thanks for registering - please <Link to="/">Login</Link>
      </div>
    )
  }
}

export default Registered