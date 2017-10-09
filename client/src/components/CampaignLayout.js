import React, { Component } from 'react'
import { Grid, Segment, Image } from 'semantic-ui-react'
import Nav from './Nav'
import { connect } from 'react-redux'
import { AuthRoute as Route } from '../lib/auth'
import {withRouter} from 'react-router-dom'


class CampaignLayout extends Component {
    render() {
        return (
            <div>
            <Image 
              src="https://d371bzke8qmfhi.cloudfront.net/styles/explore_hero/s3/images/navigation/mountrushmore_1.jpg?itok=4-xvtCQs"
              style={{position:'fixed', opacity:'0.5'}}
              />
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
            </div>
        )
    }
}
function mapStateToProps(appState) {
    return {...appState.app.campaign }
}
export default withRouter(connect(mapStateToProps)(CampaignLayout))