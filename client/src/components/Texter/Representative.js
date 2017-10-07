import React, { Component } from 'react'
import { Card, Image, List } from 'semantic-ui-react'

class Representative extends Component {
    render() {
        return (
                <Card>
                <Image src={this.props.rep.representative.photoUrl} alt={this.props.rep.representative.name} centered="true"/>
                <Card.Content>
                <Card.Header>{this.props.rep.representative.name}</Card.Header>
                <Card.Meta>{this.props.rep.office.name}</Card.Meta>
                <h4>State of {this.props.rep.state}</h4>
                <List>
                    <List.Item content={`Address: ${this.props.rep.representative.address[0].line1}, ${this.props.rep.representative.address[0].city}, ${this.props.rep.representative.address[0].state}, ${this.props.rep.representative.address[0].zip}`} />
                    <List.Item >Phone: <a href={`tel:+1${this.props.rep.representative.phones[0]}`}>{this.props.rep.representative.phones}</a> </List.Item>
                    <List.Item>Website: <a href={this.props.rep.representative.urls[0]}>{this.props.rep.representative.name}</a></List.Item>
                </List>
                </Card.Content>
                </Card>	
                )
    }
}

export default Representative