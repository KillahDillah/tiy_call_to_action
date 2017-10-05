import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'
import Nav from './Nav'

import { AuthRoute as Route } from '../lib/auth'

class CampaignLayout extends Component {
    render() {
        console.log("this.props.match",this.props.match)
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

export default CampaignLayout