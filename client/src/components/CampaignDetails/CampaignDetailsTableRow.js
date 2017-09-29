import React, { Component } from 'react'

class CampaignDetailsTableRow extends Component {
    render() {
        return (
            <tr>
            <td>{this.props.person.texterPhone.replace(/\d{4}$/,'XXXX')}</td>
            <td>{this.props.person.texterFirstName + " " + this.props.person.texterLastName}</td>
            <td>{this.props.person.texterEmail}</td>
            <td>{this.props.person.texterCity}</td>
            <td>{this.props.person.texterState}</td>
            <td>{this.props.person.texterRepresentatives.split(",").map(function(item){
                return <div key={item}>{item}<br/></div>
            })}</td>
        </tr>	
                )
    }
}

export default CampaignDetailsTableRow