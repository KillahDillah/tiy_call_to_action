import React, { Component } from 'react'
import axios from 'axios'
import { Button, Form, Grid, Image, Segment } from 'semantic-ui-react'

class CampaignReg extends Component {

  constructor(){
    super()
    this.state={
      fname:"",
      lname:"",
      username:"",
      email:"",
      password:"",
      error:''
    }
  }

    handleChange=(e)=>{
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    submitForm=(e)=>{
      e.preventDefault()
      axios.post('/api/CampaignerReg',{
        fname: this.state.fname,
        lname: this.state.lname,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }).then(resp => {
        this.props.history.push('/registered')
      }).catch(err => {
        console.log(err)
        this.setState({
          error:'Username already taken!'
        })
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
                    placeholder='First Name or Organization'
                    name='fname'
                  />
                  <Form.Input onChange={this.handleChange}
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Last Name (optional)'
                    name='lname'
                  />
                  <Form.Input onChange={this.handleChange}
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Username/Organization'
                    name='username'
                  />
                  {this.state.error !== '' ? <p>{this.state.error}</p> : ''}
                  <Form.Input onChange={this.handleChange}
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='E-mail address'
                    name='email'
                  />
                  <Form.Input onChange={this.handleChange}
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name='password'
                  />

                  <Button color='teal' fluid size='large' type="submit">Register</Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
    )
  }
}

export default CampaignReg