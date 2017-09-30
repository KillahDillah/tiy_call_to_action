import React, { Component } from 'react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'
import {AuthRoute as Route} from '../lib/auth'
import {Provider} from 'react-redux'
import store from '../store'
import NewCampaign from './NewCampaign'
import 'normalize.css/normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import '../styles/css/main.css'
import TexterForm from './Texter/TexterForm'
import ErrorRegistering from './Texter/ErrorRegistering'
import ThanksRegistering from './Texter/ThanksRegistering'
import CampaignDetails from './CampaignDetails/CampaignDetailsContainer'
import CampaignerReg from './CampaignerReg'
import Login from './Login'
import Registered from './Registered'
import Dashboard from './Dashboard'
import Letter from './Letter'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/registration" component={CampaignerReg} />
              <Route exact path="/reg/:phone" component={TexterForm} />
              <Route exact path="/error" component={ErrorRegistering} />
              <Route exact path="/thanks/:id" component={ThanksRegistering}/>
              <Route exact path="/registered" component={Registered} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route path="/new-campaign" component={NewCampaign}/>
              <Route path="/campaign/:id_campaign" component={CampaignDetails} />
              <Route path="/letter/" component={Letter} />
            </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
