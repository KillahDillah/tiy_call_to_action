import React, { Component } from 'react'
import axios from 'axios'

import CampaignDetailsTable from './CampaignDetailsTable'

class CampaignDetails extends Component {
    state = {
        err:null,
        detailsArr:"loading"
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
        if(this.state.detailsArr === "loading"){
            partial = <div>Loading</div>
        }else if(!this.state.detailsArr){
            partial = <div>No campaign data available</div>
            
        }else{
            partial = <CampaignDetailsTable data={this.state.detailsArr} />
        }
        return (
                <div>
                    {partial}
                </div>	
                )
    }
}

export default CampaignDetails