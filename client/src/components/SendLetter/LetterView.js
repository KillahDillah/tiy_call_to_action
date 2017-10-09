import React, { Component } from 'react'
import axios from 'axios'
import { Segment, Image, Menu, Icon } from 'semantic-ui-react'

class LetterView extends Component {
    state = {
        sentArr: [],
        currentIndex:1
    }
    componentWillMount() {
        axios.get(`/api/campaign/${this.props.match.params.id_campaign}/letterlist`)
            .catch(err => {
                this.setState({
                    err: err
                })
            })
            .then(results => {
                let sent = results.data.results.filter(obj => obj.lob_id)
                this.setState({
                    sentArr: sent
                })
            })
    }
    clickUp = (e) => {
        console.log("Clicked!")
        if(this.state.currentIndex < this.state.sentArr.length){
            this.setState({
                currentIndex:this.state.currentIndex + 1
            })
        }
    }
    clickDown = (e) => {
        if(this.state.currentIndex > 1){
            this.setState({
                currentIndex:this.state.currentIndex - 1
            })
        }
    }
    render() {
        return (
            <Segment>
            {this.state.sentArr[0] && <Image src={this.state.sentArr[this.state.currentIndex-1].thumbnail} wrapped />}
                <Menu floated='right' pagination>
                    <Menu.Item as='a' icon onClick={this.clickDown}>
                        <Icon name='left chevron' />
                    </Menu.Item>
                    <Menu.Item>
                    {this.state.currentIndex} of {this.state.sentArr.length || 0}
                    </Menu.Item>
                    <Menu.Item as='a' icon onClick={this.clickUp}>
                        <Icon name='right chevron' />
                    </Menu.Item>
                </Menu>
            </Segment>
        )
    }
}

export default LetterView