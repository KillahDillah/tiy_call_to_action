import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ListItem extends Component {
  
  render() {
    return(
      <Link to={'/campaign/'+this.props.id_campaign+'/'+this.props.name}>{this.props.name}</Link>
    )
  }
}

export default ListItem