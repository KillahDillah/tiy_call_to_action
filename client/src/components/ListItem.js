import React, { Component } from 'react'

class ListItem extends Component {
  onClick = (e) =>{
    console.log(`/campaign/${this.props.id_campaign}/${this.props.name}`)
  }
  render() {
    return(
      <li onClick={this.onClick}>
      {this.props.name}
      </li>
    )
  }
}

export default ListItem