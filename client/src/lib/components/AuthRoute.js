import React, {Component} from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const PUBLIC_ROOT = '/login'

class AuthRoute extends Component {
  render() {
    const { component } = this.props
    const { isPrivate } = component

    if (isPrivate) {
      return this.props.isAuthenticated ?
        <Route {...this.props} component={component} /> :
        <Redirect to={PUBLIC_ROOT} />
    }

    return <Route {...this.props} component={component} />
  }
}

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  isAuthenticated: PropTypes.bool
}

function mapStateToProps(appState, ownProps) {
  return {
    isAuthenticated: appState.auth.isAuthenticated,
    ...ownProps
  }
}

export default connect(mapStateToProps)(AuthRoute)
