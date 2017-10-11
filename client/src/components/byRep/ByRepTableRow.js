import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class ByRepTableRow extends Component {
    render() {
        return (
            <Table.Row>
            <Table.Cell>{this.props.rep.repName}</Table.Cell>
            <Table.Cell>{this.props.rep.repOffice}</Table.Cell>
            <Table.Cell>{this.props.rep.texterState}</Table.Cell>
            <Table.Cell>{this.props.rep.value}</Table.Cell>
        </Table.Row>	
                )
    }
}

export default ByRepTableRow