import React, { Component } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'


//TODO: Clear state on form submit and change to singular keyword

class NewCampaign extends Component {

  constructor (){
    super()
    this.state = {
      campname: "",
      keywords: "",
      campsdesc: "",
      campldesc: ""
    }
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  submitForm=(e)=>{
    e.preventDefault()
    axios.post('/api/NewCampaign', {
      campname:this.state.campname,
      keywords:this.state.keywords,
      campldesc:this.state.campldesc,
      campsdesc:this.state.campsdesc,
      userId:jwtDecode(localStorage.getItem('token')).userId
    }).then (resp => {
      this.setState({
        campname: "",
        keywords: "",
        campsdesc: "",
        campldesc: ""
      })
    }).then (resp => {
      this.props.history.push('/dashboard')
    })
  }

  render() {
    return(
      <div className="new-campaign">
        <form onSubmit={this.submitForm}>
          <div className="new-c-name">
            <label htmlFor="c-name">Campaign Name</label>
            <input onChange={this.handleChange} type="text" value={this.state.campname} name="campname" placeholder="Campaign Name" />
          </div>
          <div className="c-short-desc">
            <label htmlFor="c-short-desc">Short Description</label>
            <textarea onChange={this.handleChange} name="campsdesc" value={this.state.campsdesc} placeholder="This desciption will be when sent via text" />
          </div>
          <div className="c-long-desc">
            <label htmlFor="c-long-desc">Body of Letter</label>
            <textarea onChange={this.handleChange} name="campldesc" value={this.state.campldesc} placeholder="Body of letter sent to representative"/>
          </div>
          <div className="keywords">
            <label htmlFor="keywords"> Keyword</label>
            <textarea onChange={this.handleChange} name="keywords" value={this.state.keywords} placeholder="One keyword" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Authorize(NewCampaign)