import React, { Component } from 'react'
import axios from 'axios'

class UpdateTexters extends Component {
    state = {
        body:""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`/api/campaign/${this.props.id_campaign}/updateTexters`, {
            Body:this.state.body
          }).then (resp => {
            this.setState({
              body: ""
            })
            this.props.history.push('/dashboard')
          })
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

export default UpdateTexters