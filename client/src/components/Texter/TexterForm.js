import React, { Component } from 'react'
import axios from 'axios'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

class TexterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            address:"",
            firstname:"",
            lastname:"",
            streetnumber:"",
            streetname:"",
            city:"",
            usState:"",
            zip:"",
            email:"",
            phone:"",
            latLng:""
        }
        this.onChange = (address) => this.setState({ address })
    }
    
    handleChange = (e) =>
    {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleAddressSubmit = (e) =>
    {
        e.preventDefault()
        geocodeByAddress(this.state.address)
        .then(results => {
            let addressObj = {}
            results[0].address_components.forEach(function(item){
                addressObj[item.types[0]] = item.short_name
            })
            this.setState({
                streetnumber:addressObj.street_number || "",
                streetname:addressObj.route || "",
                city:addressObj.locality || "",
                usState:addressObj.administrative_area_level_1 || "",
                zip:addressObj.postal_code || ""
            })
        } )
        .catch(error => console.error('Error', error))
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
            address:this.state.address || `${this.state.streetnumber}, ${this.state.streetname}, ${this.state.city}, ${this.state.usState}, ${this.state.zip}, `,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            streetnumber:this.state.streetnumber,
            streetname:this.state.streetname,
            city:this.state.city,
            state:this.state.usState,
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
            console.log(response)
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
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
          }

        return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="First Name" onChange={this.handleChange} name="firstname"/>
                        <input type="text" placeholder="Last Name" onChange={this.handleChange} name="lastname"/>
                        <input type="text" placeholder="Email" onChange={this.handleChange} name="email"/>
                        <input type="text" placeholder="Phone number including +1 and area code" onChange={this.handleChange} name="phone"/>
                        <div>
                                <PlacesAutocomplete inputProps={inputProps}/>
                                <button type="submit" onClick={this.handleAddressSubmit}>Find Address from Google</button>
                        </div>
                        <input type="text" placeholder="Street Number" onChange={this.handleChange} name="streetnumber" value={this.state.streetnumber} />
                        <input type="text" placeholder="Street Name" onChange={this.handleChange} name="streetname" value={this.state.streetname} />
                        <input type="text" placeholder="City" onChange={this.handleChange} name="city" value={this.state.city} />
                        <input type="text" placeholder="State" onChange={this.handleChange} name="usState" value={this.state.usState} />
                        <input type="text" placeholder="Zip" onChange={this.handleChange} name="zip" value={this.state.zip} />
                        <button type="Submit">Register</button>
                    </form>
                </div>	
                )
    }
}

export default TexterForm