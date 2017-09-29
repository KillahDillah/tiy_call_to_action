import React, { Component } from 'react'

class CampaignDetailsTable extends Component {
    render() {
        return (
                <div>
                <table>
                    <thead>
                    <tr>
                        <th>Phone number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>State</th>
                        <th>House Representative</th>
                        <th>Senators</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.props.data[0].texterFirstName}</td>
                        <td>{this.props.data[0].texterFirstName}</td>
                        <td>{this.props.data[0].texterFirstName}</td>
                        <td>{this.props.data[0].texterFirstName}</td>
                        <td>{this.props.data[0].texterFirstName}</td>
                        <td>{this.props.data[0].texterFirstName}</td>
                        <td>{this.props.data[0].texterFirstName}</td>
                    </tr>
                    </tbody>
                </table>
                </div>	
                )
    }
}

export default CampaignDetailsTable