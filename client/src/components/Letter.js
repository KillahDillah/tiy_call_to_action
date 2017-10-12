import React, { Component } from 'react'
//import jwtDecode from 'jwt-decode'
import axios from 'axios'
import Moment from 'moment'

class Letter extends Component {

  state = {
    campaigns:[]
  }

  componentWillMount() {
    axios.get(`/api/letter/${this.props.match.params.id_campaign}`)
    .then(results =>{
      console.log (results)
      this.setState({
        campaigns: results.data
      })
    })
  }

  render() {

    let formattedDate = Moment().format("MMMM Do YYYY")

    return(
      <div>
        <div>
          <p>Date: {formattedDate}</p>
        </div>
        <div>
        {this.state.campaigns.map(function(campaign){
          return <div key={campaign.id} className='result'>
            <div>
            <p>Name: {campaign.name}</p>
            </div>
            <div>
              <p> {`To: {{repName}}`}</p>
            </div>
            <br/>
            <div id="ltr-desc">
              <p> {campaign.longDesc}</p>
            </div>
            <br/>
            <div>
              <p>Regards, {`{{yourName}}`}</p>
              <br/>
              <p>{`{{address1}}`}</p>
              <p>{`{{city}}, {{state}}, {{zip}}`}</p>
            </div>
          </div>

        })}
        </div>
      </div>
    )
  }
}

export default Letter