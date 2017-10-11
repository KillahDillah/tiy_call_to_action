import React, { Component } from 'react'
import ByRepTableRow from './ByRepTableRow'
import { Table } from 'semantic-ui-react'

class ByRepTable extends Component {
    render() {
        return (
                <div>
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Representative</Table.HeaderCell>
                        <Table.HeaderCell>Office</Table.HeaderCell>
                        <Table.HeaderCell>State</Table.HeaderCell>
                        <Table.HeaderCell>Responses</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.data.map(function(item){
                            return <ByRepTableRow rep={item} key={item.repName} />
                        }) }
                    </Table.Body>
                </Table>
                </div>	
                )
    }
}

export default ByRepTable