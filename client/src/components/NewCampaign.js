import React, { Component } from 'react'
import axios from 'axios'

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
      campsdesc:this.state.campsdesc
    }).then(function(resp){
      console.log(resp)
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
            <label htmlFor="c-long-desc">Long Description</label>
            <textarea onChange={this.handleChange} name="campldesc" value={this.state.campldesc} placeholder="Description used when user views campaign page via site"/>
          </div>
          <div className="keywords">
            <label htmlFor="keywords"> Keywords</label>
            <textarea onChange={this.handleChange} name="keywords" value={this.state.keywords} placeholder="For searching" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default NewCampaign