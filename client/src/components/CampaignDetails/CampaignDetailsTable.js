import React, { Component } from 'react'
import CampaignDetailsTableRow from './CampaignDetailsTableRow'
import { Table } from 'semantic-ui-react'

class CampaignDetailsTable extends Component {
    render() {
        return (
                <div>
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Phone number</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>City</Table.HeaderCell>
                        <Table.HeaderCell>State</Table.HeaderCell>
                        <Table.HeaderCell>Elected Representatives</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.data.map(function(item){
                            return <CampaignDetailsTableRow person={item} key={item.id_texters} />
                        }) }
                    </Table.Body>
                </Table>
                </div>	
                )
    }
}

export default CampaignDetailsTable