import React, { Component } from 'react'
import { Grid, Segment, Header, Label } from 'semantic-ui-react'
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
                        <Header as="h1">
                        {this.props.name}
                        <Header.Subheader>
                        {this.props.shortDesc}
                        </Header.Subheader>
                        </Header>
                        <Label ribbon="right">{this.props.countActivity} responses</Label>
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