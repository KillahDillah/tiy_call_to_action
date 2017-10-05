import React, { Component } from 'react'
import axios from 'axios'
import Representative from './Representative'
import { Container, Grid, Header} from 'semantic-ui-react'

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
                <Container textAlign="centered">
                <Header as='h2'>Thanks for registering!</Header>
                <p>You should receive a text back shortly</p>
                <Header as='h4'>Your representatives are:</Header>
                <Container>
                
                {partial}
                </Container>
                </Container>	
                )
    }
}

export default ThanksRegistering