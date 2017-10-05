import React, { Component } from 'react'
import NewCampaign from './NewCampaign'
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
import BySenate from './BySenate'
import National from './National/National'

class Main extends Component {
  render() {
    return(
      <Router>
        <Layout>
          <Switch>
            <Route path="/newcampaign" component={NewCampaign}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/letter/:id_campaign/letter" component={Letter} />
            <Route exact path="/campaign/:id_campaign/all" component={All} />
            <Route exact path="/campaign/:id_campaign/updatetexters" component={Update} />
            <Route exact path="/campaign/:id_campaign/national" component={National} />
            <Route exact path="/campaign/:id_campaign" component={All} />
            <Route exact path="/campaign/:id_campaign/representative" component={BySenate} />
            <Route exact path="/campaign/:id_campaign/day" component={ByDay}/>
            <Route exact path="/campaign/:id_campaign/state" component={ByState}/>
            <Route exact path="/campaign/:id_campaign/sendletter" component={Letter}/>
            <Route exact path="/campaign/:id_campaign/letter" component={Letter}/>
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default Authorize(Main)