import React, { Component } from 'react'
import axios from 'axios'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'
import { Form, Container, Menu, Image, Button, Segment, Label } from 'semantic-ui-react'

class TexterForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: "",
            firstname: "",
            lastname: "",
            streetnumber: "",
            streetname: "",
            city: "",
            usState: "",
            zip: "",
            email: "name@example.com",
            phone: this.props.match.params.phone,
            latLng: "",
            visible:true,
            css:{display:'none'},
            hide:false
        }
        this.onChange = (address) => this.setState({ address })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleAddressSubmit = (e) => {
        e.preventDefault()
        geocodeByAddress(this.state.address)
            .then(results => {
                let addressObj = {}
                results[0].address_components.forEach(function (item) {
                    addressObj[item.types[0]] = item.short_name
                })
                this.setState({
                    streetnumber: addressObj.street_number || "",
                    streetname: addressObj.route || "",
                    city: addressObj.locality || "",
                    usState: addressObj.administrative_area_level_1 || "",
                    zip: addressObj.postal_code || "",
                    visible:false,
                    css:{display:'inherit'},
                    hide:true
                })
            })
            .catch(error => console.error('Error', error))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        /**
         * This call goes to the local api to register
         */
        axios({
            method: 'post',
            url: '/api/texter',
            data: {
                address: this.state.address || `${this.state.streetnumber}, ${this.state.streetname}, ${this.state.city}, ${this.state.usState}, ${this.state.zip}, `,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                streetnumber: this.state.streetnumber,
                streetname: this.state.streetname,
                city: this.state.city,
                state: this.state.usState,
                zip: this.state.zip,
                email: this.state.email,
                phone: this.state.phone,
                showForm: false
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .catch(err => {
                console.log(err, "Error submitting user");
            })
            .then(function (response) {
                //API will send back success as false if there is an issue
                //TODO: Handle it better so we can see if a phone number is already registered.
                console.log(response)
                if (response.data.success === false) {
                    this.props.history.push('/error')
                }
                else {
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
            <Container>
                <Menu>
                    <Menu.Item header>
                        <Image
                            size='mini'
                            src='/logo_small.png'
                            style={{ marginRight: '1.5em' }}
                        />
                        Text to Action
                    </Menu.Item>
                    <Menu.Item align="centered">
                    Registration
                    </Menu.Item>
                    
                </Menu>
                <Form onSubmit={this.handleSubmit}>
                    <Segment disabled={this.state.hide}>
                        <Label attached="top left">Address</Label>
                        <PlacesAutocomplete onContextMenu={this.handleAddressSubmitSelect} inputProps={inputProps} />
                        <Button onClick={this.handleAddressSubmit}>Verify address on Google</Button>
                    </Segment>
                    <Form.Group style={this.state.css}>
                    <Form.Input type="text" placeholder="First Name" name="firstname" label="First Name" onChange={this.handleChange}/>
                    <Form.Input type="text" placeholder="Last Name" name="lastname" label="Last Name" onChange={this.handleChange}/>
                    <Form.Input type="text" placeholder="Phone number including +1 and area code" name="phone" value={this.state.phone} label="Phone starting with +1" onChange={this.handleChange}/>
                    <Form.Input type="text" placeholder="Street Number" onChange={this.handleChange} name="streetnumber" value={this.state.streetnumber} label="Street Number"/>
                    <Form.Input type={this.state.type} placeholder="Street Name" onChange={this.handleChange} name="streetname" value={this.state.streetname} label="Street Name"/>
                    <Form.Input type={this.state.type} placeholder="City" onChange={this.handleChange} name="city" value={this.state.city} label="City" />
                    <Form.Input type={this.state.type} placeholder="State" onChange={this.handleChange} name="usState" value={this.state.usState} label="State"/>
                    <Form.Input type={this.state.type} placeholder="Zip" onChange={this.handleChange} name="zip" value={this.state.zip} label="Zip" />
                    <Button type="Submit">Register</Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}

export default TexterForm