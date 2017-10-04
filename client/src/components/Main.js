import React, { Component } from 'react'
import NewCampaign from './NewCampaign'
import CampaignDetails from './CampaignDetails/CampaignDetailsContainer'
import Letter from './Letter'
import Layout from './Layout'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import {AuthRoute as Route, Authorize} from '../lib/auth'
import Dashboard from './Dashboard'
import Home from './Home'
import All from './All'
import Update from './Update'
import ByDay from './ByDay'
import ByState from './ByState'
import National from './National/National'
class Main extends Component {
  render() {
    return(
      <Router>
        <Layout>
          <Switch>
            <Route path="/new-campaign" component={NewCampaign}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/campaign/:id_campaign/All" component={All} />
            <Route exact path="/campaign/:id_campaign/update" component={Update} />
            <Route exact path="/campaign/:id_campaign/national" component={National} />
            <Route exact path="/campaign/:id_campaign" component={CampaignDetails} />
            <Route exact path="/letter/:id_campaign" component={Letter} />
            <Route exact path="/dataview/:id_campaign" component={All} />
            <Route path="/campaign/:id_campaign/Day" component={ByDay}/>
            <Route path="/campaign/:id_campaign/State" component={ByState}/>
            <Route exact path="/" component={Home} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default Authorize(Main)