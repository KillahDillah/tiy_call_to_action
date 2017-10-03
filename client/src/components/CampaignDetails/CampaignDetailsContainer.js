import React, { Component } from 'react'
import axios from 'axios'
import UpdateTexters from '../UpdateTexters'
import CampaignDetailsTable from './CampaignDetailsTable'

class CampaignDetailsContainer extends Component {
    state = {
        err:null,
        detailsArr:false
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
    }
    render() {
        let partial
        if(!this.state.detailsArr){
            partial = <div>Loading</div>
        }else if(!this.state.detailsArr[0].id_campaign){
            partial = <div>No campaign data available</div>
            
        }else{
            partial = <div><UpdateTexters id_campaign={this.props.match.params.id_campaign}/><CampaignDetailsTable data={this.state.detailsArr} /></div>
        }
        return (
                <div>
                <h2>Campaign {this.props.match.params.id_campaign}</h2>
                    {partial}
                </div>	
                )
    }
}

export default CampaignDetailsContainer