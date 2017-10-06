import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import Nav from './Nav'
import { connect } from 'react-redux'
import { AuthRoute as Route } from '../lib/auth'

class CampaignLayout extends Component {
    state = {
        campaign:{
            name:''
        }
    }
    render() {
        console.log("appState",this.props.campaign)
        return (
            <Grid>
                <Grid.Column width={3}>
                    <Route path="/campaign/:id_campaign" component={Nav} />
                </Grid.Column>
                <Grid.Column stretched width={12}>
                    <Segment>
                    {this.props.children}
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}
function mapStateToProps(appState) {
    return { campaign: appState.campaign }
}
export default connect(mapStateToProps)(CampaignLayout)