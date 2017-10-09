import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Table, Button} from 'semantic-ui-react'
import SendButton from './SendButton'

class SendLetter extends Component {
    state = {
        fullArr: "loading",
        unsentArr: "loading",
        sentArr: "loading"
    }
    componentWillMount() {
        axios.get(`/api/campaign/${this.props.match.params.id_campaign}/letterlist`)
            .catch(err => {
                this.setState({
                    err: err
                })
            })
            .then(results => {
                let unsent = results.data.results.filter(obj => !obj.lob_id)
                let sent = results.data.results.filter(obj => obj.lob_id)
                this.setState({
                    fullArr: results.data.results,
                    unsentArr: unsent,
                    sentArr: sent
                })
            })
    }
    render() {
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Count</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Sent</Table.Cell>
                        <Table.Cell>{this.state.sentArr.length}</Table.Cell>
                        <Table.Cell>{this.state.sentArr.length > 0 && <Button>View</Button>}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell>Unsent</Table.Cell>
                    <Table.Cell>{this.state.unsentArr.length}</Table.Cell>
                    <Table.Cell>{this.state.unsentArr.length > 0 && <SendButton id_campaign={this.props.match.params.id_campaign}/>}</Table.Cell>
                </Table.Row>
                <Table.Row>
                <Table.Cell>Total</Table.Cell>
                <Table.Cell>{this.state.fullArr.length}</Table.Cell>
                <Table.Cell></Table.Cell>
            </Table.Row>
                </Table.Body>
            </Table>
        )
    }
}
export default withRouter(SendLetter)