import React, { Component } from 'react'
import NewCampaign from './NewCampaign'
import CampaignDetails from './CampaignDetails/CampaignDetailsContainer'
import Letter from './Letter'
import Layout from './Layout'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import {AuthRoute as Route} from '../lib/auth'
import Dashboard from './Dashboard'
import Home from './Home'
import CloserLook from './CloserLook'

class Main extends Component {
  render() {
    return(
      <Router>
        <Layout>
          <Switch>
            <Route path="/new-campaign" component={NewCampaign}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/campaign/:id_campaign" component={CampaignDetails} />
            <Route path="/letter/:id_campaign" component={Letter} />
            <Route path="/dataview/:id_campaign" component={CloserLook} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default Main