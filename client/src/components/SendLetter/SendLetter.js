import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import { Table, Button, Container, Message} from 'semantic-ui-react'
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
            <Container>
            <Message>
            <Message.Header>Sending a Letter</Message.Header>
            <Message.List>
              <Message.Item>Letters are mailed using the <a href="https://www.lob.com">Lob service</a>.</Message.Item>
              <Message.Item>Each texter will have three to five representatives to send letters for.</Message.Item>
              <Message.Item>Images are provided of the letters of how they appear printed out.</Message.Item>
            </Message.List>
          </Message>
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
                        <Table.Cell>{this.state.sentArr.length > 0 && <Button as={Link} to={`/campaign/${this.props.match.params.id_campaign}/letterview`}>View</Button>}</Table.Cell>
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
            </Container>
        )
    }
}
export default withRouter(SendLetter)