import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class SendButton extends Component {
    state={
        buttonText:'Send',
        buttonColor:'vk'
    }
    onClick = (e) =>{
        axios.post(`/api/campaign/${this.props.id_campaign}/sendletters`)
        .catch(response =>{
            this.setState({
                buttonText:'Error!',
                buttonColor:'red'
            })
        })
        .then(data=>{
            console.log(data)
            this.setState({
                buttonText:"Sent!",
                buttonColor:'green'
            })
        }).then(e=>{
            setTimeout(function() { this.props.history.push(`/campaign/${this.props.id_campaign}/letterview`); }.bind(this), 3000)
        })
    }
    render() {
        return (
                <Button color={this.state.buttonColor} onClick={this.onClick}>{this.state.buttonText}</Button>	
                )
    }
}

export default withRouter(SendButton)