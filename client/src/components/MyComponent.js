import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getFoo} from '../actions/app'

class MyComponent extends Component {
  componentWillMount() {
    getFoo()
  }

  render() {
    return (
      <div>
        <h1>{this.props.foo}</h1>
      </div>
    )
  }
}

const stateToProps = function(appState) {
  return {
    foo: appState.app.foo // ".app" because we ran combineReducers
  }
}

export default connect(stateToProps)(MyComponent)