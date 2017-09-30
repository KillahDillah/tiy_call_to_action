import React, { Component } from 'react'
import axios from 'axios'

import CampaignDetailsTable from './CampaignDetailsTable'

class CampaignDetails extends Component {
    state = {
        err:null,
        detailsArr:false
    }
    
    componentWillMount(){
        axios.get(`/api/campaign/${this.props.id_campaign}`)
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
    }
    render() {
        let partial
        if(!this.state.detailsArr){
            partial = <div>Loading</div>
        }else if(!this.state.detailsArr[0].id_campaign){
            partial = <div>No campaign data available</div>
            
        }else{
            partial = <CampaignDetailsTable data={this.state.detailsArr} />
        }
        return (
                <div>
                <h2>Campaign {this.props.match.params.id_campaign}</h2>
                    {partial}
                </div>	
                )
    }
}

export default CampaignDetails