import React, { Component } from 'react'
import axios from 'axios'

class TexterForm extends Component {
    state = {
        firstname:"",
        lastname:"",
        streetname:"",
        city:"",
        state:"",
        zip:"",
        email:"",
        phone:""
    }
    handleChange = (e) =>
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit = (e) =>
    {
        e.preventDefault()
        /**
         * This call goes to the local api to register
         */
        axios({
          method: 'post',
          url: '/api/texter',
          data: {
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            streetname:this.state.streetname,
            city:this.state.city,
            state:this.state.state,
            zip:this.state.zip,
            email:this.state.email,
            phone:this.state.phone
            },
          headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
          })
          .catch(err => {
            console.log(err, "Error submitting user");
          })
        .then(function(response){
            //API will send back success as false if there is an issue
            //TODO: Handle it better so we can see if a phone number is already registered.
            if(response.data.success === false){
                this.props.history.push('/error')
            }
            else{
                this.props.history.push(`/thanks/${response.data.id}`)
            }
        }.bind(this))
        
    }
    /**
     * This element is a simple form for registering a texter
     * TODO: Make pretty, add validation
     */
    render() {
        return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="First Name" onChange={this.handleChange} name="firstname"/>
                        <input type="text" placeholder="Last Name" onChange={this.handleChange} name="lastname"/>
                        <input type="text" placeholder="Street Name and number" onChange={this.handleChange} name="streetname"/>
                        <input type="text" placeholder="City" onChange={this.handleChange} name="city"/>
                        <input type="text" placeholder="State" onChange={this.handleChange} name="state"/>
                        <input type="text" placeholder="Zip" onChange={this.handleChange} name="zip"/>
                        <input type="text" placeholder="Email" onChange={this.handleChange} name="email"/>
                        <input type="text" placeholder="Phone number including +1 and area code" onChange={this.handleChange} name="phone"/>
                        <button type="Submit">Register</button>
                    </form>
                </div>	
                )
    }
}

export default TexterForm