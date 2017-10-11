import React, { Component } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'
import { Button, Form, Grid, Segment, TextArea } from 'semantic-ui-react'


//TODO: Clear state on form submit and change to singular keyword

class NewCampaign extends Component {

  constructor (){
    super()
    this.state = {
      campname: "",
      keywords: "",
      campsdesc: "",
      campldesc: `Dear(congressperson),
                    My name is (texter).
                    Please consider my vote for (campaign).
                    Regards, (texter)`
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
      this.props.history.push('/')
    })
  }

  render() {
    return(
      <div className='login-form'>
          <style>{`
            body > div,
            body > div > div {
              height: 100%;
            }
            body > div > div > div.login-form  {
              margin-top:10%;
            }
          `}</style>
          <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form size='large' onSubmit={this.submitForm}>
                <Segment stacked>
                  <Form.Input onChange={this.handleChange}
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='New Campaign Name'
                    name='campname'
                  />
                  <Form.Input onChange={this.handleChange}
                    fluid
                    icon='edit'
                    iconPosition='left'
                    placeholder='This desciption will be when sent via text'
                    name='campsdesc'
                  />
                  <TextArea onChange={this.handleChange}
                    icon='sticky note outline'
                    placeholder='Body of letter sent to representative'
                    value={this.state.campldesc}
                    name='campldesc'
                  />
                  <Form.Input onChange={this.handleChange}
                    fluid
                    icon='asterisk'
                    iconPosition='left'
                    placeholder='Keyword'
                    name='keywords'
                  />
                  <Button color='teal' fluid size='large' type='submit'>Create</Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
    )
  }
}

export default Authorize(NewCampaign)