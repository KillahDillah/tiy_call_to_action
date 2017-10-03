import React, { Component } from 'react'
import axios from 'axios'
import Representative from '../Representative'

class ThanksRegistering extends Component {
    state = {
        err:null,
        reps:false
    }
    componentWillMount(){
        axios.get(`/api/texter/${this.props.match.params.id}`)
        .catch(err => {
            this.setState({
                err:err
            })
        })
        .then(results => {
            this.setState({
                reps:results.data
            })
        })
      }
    render() {
        let partial
        if(!this.state.reps){
            partial = <div>Loading</div>
        }else if(!this.state.reps[0].representative){
            console.log("reps",this.state.reps)
            partial = <div>No senators found</div>
            
        }else{
            partial = this.state.reps.map(function(rep){
                return <Representative rep={rep} key={rep.representative.name} />
            })
        }
        return (
                <div>
                <h3>Thanks for registering!</h3>
                <br/>
                <p>You should receive a text back shortly</p>
                <h3>Your representatives are:</h3>
                {partial}
                </div>	
                )
    }
}

export default ThanksRegistering