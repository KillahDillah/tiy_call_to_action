import React, { Component } from 'react'
import axios from 'axios'

import CampaignDetailsTable from './CampaignDetailsTable'

class CampaignDetailsContainer extends Component {
    state = {
        err:null,
        detailsArr:[]
    }
    
    componentWillMount(){
        axios.get(`/api/campaign/${this.props.match.params.id_campaign}`)
        .catch(err => {
            this.setState({
                err:err
            })
        })
        .then(results => {
            this.setState({
                detailsArr:results.data.results
            })
        })
        .then(e =>{
            console.log(this.state)
        })
    }
    render() {
        return (
                <div>
                <h2>Campaign {this.props.match.params.id_campaign}</h2>
                    { this.state.detailsArr.length > 0 && <CampaignDetailsTable data={this.state.detailsArr} /> }
                </div>	
                )
    }
}

export default CampaignDetailsContainer