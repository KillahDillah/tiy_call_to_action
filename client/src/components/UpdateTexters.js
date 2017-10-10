import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Form, TextArea, Button, Header } from 'semantic-ui-react'

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
                <Header>Send an update on the campaign!</Header>
                <Form onSubmit={this.handleSubmit}>
                    <TextArea onChange={this.handleChange} name="body">{this.state.body}</TextArea>
                    <Button type="submit">Send Message</Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(UpdateTexters)