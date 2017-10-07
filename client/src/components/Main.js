import React, { Component } from 'react'
import NewCampaign from './NewCampaign'
import Layout from './Layout'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthRoute as Route, Authorize } from '../lib/auth'
import Dashboard from './Dashboard'
import Campaign from './Campaign'

class Main extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/newcampaign" component={NewCampaign} />
            <Route path="/campaign/:id_campaign" component={Campaign} />
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default Authorize(Main)