import React, { Component } from 'react'
import DataMap from './DataMap'
import axios from 'axios'

class National extends Component {
    state = {
        detailsArr: "loading"
    }
    componentWillMount() {
        axios.get(`/api/campaign/${this.props.match.params.id_campaign}/national`)
            .catch(err => {
                this.setState({
                    err: err
                })
            })
            .then(results => {
                console.log("national",results.data.results)
                this.setState({
                    detailsArr: results.data.results
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
            partial = <DataMap regionData={this.state.detailsArr} />
        }
        return (
            <div>
                {partial}
            </div>
        )
    }
}

export default National