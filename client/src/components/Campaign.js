import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AuthRoute as Route } from '../lib/auth'
import CampaignLayout from './CampaignLayout'

import All from './All'
import Update from './Update'
import ByDay from './ByDay'
import ByState from './ByState'
import BySenate from './BySenate'
import National from './National/National'
import Letter from './Letter'
import SendLetter from './SendLetter/SendLetter'
import LetterView from './SendLetter/LetterView'
import {setCampaignDetails} from '../actions/campaignAction'
import {withRouter} from 'react-router-dom'

class Campaign extends Component {
    componentWillMount(){
        setCampaignDetails(this.props.match.params.id_campaign)
    }
    render() {
        return (
            <Router>
                <CampaignLayout>
                    <Switch>
                        <Route exact path="/campaign/:id_campaign" component={National} />
                        <Route exact path="/campaign/:id_campaign/all" component={All} />
                        <Route exact path="/campaign/:id_campaign/updatetexters" component={Update} />
                        <Route exact path="/campaign/:id_campaign/campaign" component={National} />
                        <Route exact path="/campaign/:id_campaign/representative" component={BySenate} />
                        <Route exact path="/campaign/:id_campaign/day" component={ByDay} />
                        <Route exact path="/campaign/:id_campaign/state" component={ByState} />
                        <Route exact path="/campaign/:id_campaign/sendletter" component={SendLetter} />
                        <Route exact path="/campaign/:id_campaign/letter" component={Letter} />
                        <Route exact path="/campaign/:id_campaign/letterview" component={LetterView} />
                    </Switch>
                </CampaignLayout>
            </Router>
        )
    }
}

export default withRouter(Campaign)