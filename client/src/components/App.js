import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '../store'
import Layout from './Layout'
import MyComponent from './MyComponent'
import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import '../styles/App.css'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/" component={MyComponent} />
            </Switch>
          </Layout>
        </Router>
      </Provider>
    )
  }
}

export default App
