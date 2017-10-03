import React, { Component } from 'react'

class Representative extends Component {
    render() {
        return (
                <div>
                <img src={this.props.rep.representative.photoUrl} alt={this.props.rep.representative.name} />
                <h2>{this.props.rep.representative.name}</h2>
                <h4>{this.props.rep.office.name}</h4>
                <h4>State of {this.props.rep.state}</h4>
                <ul>
                    <li>Address: {this.props.rep.representative.address[0].line1}, {this.props.rep.representative.address[0].city}, {this.props.rep.representative.address[0].state}, {this.props.rep.representative.address[0].zip}</li>
                    <li>Phone: {this.props.rep.representative.phones[0]}</li>
                    <li>Website: <a href={this.props.rep.representative.urls[0]}>{this.props.rep.representative.name}</a></li>
                </ul>
                </div>	
                )
    }
}

export default Representative