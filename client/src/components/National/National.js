import React, { Component } from 'react'
import DataMap from './DataMap'
import axios from 'axios'
import Nav from '../Nav'

class National extends Component {
    state={
        detailsArr:[]
    }
    componentWillMount(){
        axios.get(`/api/campaign/${this.props.match.params.id_campaign}/national`)
        .catch(err => {
            this.setState({
                err:err
            })
        })
        .then(results => {
            console.log(results.data.results)
            this.setState({
                detailsArr:results.data.results
            })
        })
    }
    render() {
        return (
                <div>
                    <DataMap regionData={this.state.detailsArr}/>
                    <Nav id_campaign={this.props.match.params.id_campaign} />
                </div>	
                )
    }
}

export default National