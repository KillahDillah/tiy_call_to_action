import React, { Component } from 'react'
import axios from 'axios'
import {Container} from 'semantic-ui-react'
import ByRepTable from './ByRepTable'
import {withRouter} from 'react-router-dom'

class ByRep extends Component {
    state = {
        err:null,
        detailsArr:"loading"
    }
    
    componentWillMount(){
        axios.get(`/api/campaign/${this.props.match.params.id_campaign}/reps`)
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
        let partial
        if(this.state.detailsArr === "loading"){
            partial = <div>Loading</div>
        }else if(!this.state.detailsArr){
            partial = <div>No campaign data available</div>
            
        }else{
            partial = <ByRepTable data={this.state.detailsArr} />
        }
        return (
                <Container>
                    {partial}
                </Container>	
                )
    }
}
export default withRouter(ByRep)