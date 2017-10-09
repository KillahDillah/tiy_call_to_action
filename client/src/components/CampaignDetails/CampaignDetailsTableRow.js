import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class CampaignDetailsTableRow extends Component {
    render() {
        return (
            <Table.Row>
            <Table.Cell>{this.props.person.texterPhone.replace(/\d{4}$/,'XXXX')}</Table.Cell>
            <Table.Cell>{this.props.person.texterFirstName + " " + this.props.person.texterLastName}</Table.Cell>
            <Table.Cell>{this.props.person.texterEmail}</Table.Cell>
            <Table.Cell>{this.props.person.texterCity}</Table.Cell>
            <Table.Cell>{this.props.person.texterState}</Table.Cell>
            <Table.Cell>{this.props.person.texterRepresentatives.split(",").map(function(item){
                return <div key={item}>{item}<br/></div>
            })}</Table.Cell>
        </Table.Row>	
                )
    }
}

export default CampaignDetailsTableRow