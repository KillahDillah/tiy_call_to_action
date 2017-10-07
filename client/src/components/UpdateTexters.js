import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class UpdateTexters extends Component {
    constructor(props){
        super(props)
        this.state = {
            body:""
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: `/api/campaign/${this.props.id_campaign}/updateTexters`,
            data: {
                Body:this.state.body
              },
            headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            })
            .catch(err => {
              console.log(err, "Error sending texts");
            })
          .then(function(response){
                  this.props.history.push(`/campaign/${this.props.id_campaign}`)
          }.bind(this))
    }
    render() {
        return (
            <div>
                <h3>Send an update on the campaign!</h3>
                <form onSubmit={this.handleSubmit}>
                    <textarea rows="4" cols="50" onChange={this.handleChange} name="body">{this.state.body}</textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        )
    }
}

export default withRouter(UpdateTexters)