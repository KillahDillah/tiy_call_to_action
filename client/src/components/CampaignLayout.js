import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import Nav from './Nav'
import { connect } from 'react-redux'
import { AuthRoute as Route } from '../lib/auth'
import {withRouter} from 'react-router-dom'

class CampaignLayout extends Component {
    render() {
        return (
            <Grid>
                <Grid.Column width={3}>
                    <Route path="/campaign/:id_campaign" component={Nav} />
                </Grid.Column>
                <Grid.Column stretched width={12}>
                    <Segment>
                    <h2>{this.props.name}</h2>
                    <p>{this.props.shortDesc}</p>
                    <p>Activity: {this.props.countActivity}</p>
                    {this.props.children}
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}
function mapStateToProps(appState) {
    return {...appState.app.campaign }
}
export default withRouter(connect(mapStateToProps)(CampaignLayout))