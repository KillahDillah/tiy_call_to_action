import React, { Component } from 'react'
import DataMap from './DataMap'
import axios from 'axios'
import Nav from '../Nav'
import { Grid, Menu, Segment } from 'semantic-ui-react'

class National extends Component {
    state = {
        detailsArr: []
    }
    componentWillMount() {
        axios.get(`/api/campaign/${this.props.match.params.id_campaign}/national`)
            .catch(err => {
                this.setState({
                    err: err
                })
            })
            .then(results => {
                console.log(results.data.results)
                this.setState({
                    detailsArr: results.data.results
                })
            })
    }
    render() {
        return (
            <Grid>
                <Grid.Column width={3}>
                    <Nav id_campaign={this.props.match.params.id_campaign} />
                </Grid.Column>
                <Grid.Column stretched width={12}>
                    <Segment>
                        <DataMap regionData={this.state.detailsArr} />
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default National