import React, { Component } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {Authorize} from '../lib/auth'
import { Button, Form, Grid, Image, Segment } from 'semantic-ui-react'


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
      this.props.history.push('/')
    })
  }

  render() {
    return(
      <div className='login-form'>
        <Image 
        src="https://d371bzke8qmfhi.cloudfront.net/styles/explore_hero/s3/images/navigation/mountrushmore_1.jpg?itok=4-xvtCQs"
        style={{position:'fixed', opacity:'0.5'}}
        />
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
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
                  <Form.Input onChange={this.handleChange}
                    fluid
                    icon='sticky note outline'
                    iconPosition='left'
                    placeholder='Body of letter sent to representative'
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