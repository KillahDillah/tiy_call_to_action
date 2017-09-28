import React, {Component} from 'react'

const Authorize = (TheComponent) => {
  class Auth extends Component {
    static isPrivate = true

    render() {
      return <TheComponent {...this.props} />
    }
  }

  return Auth
}

export default Authorize
