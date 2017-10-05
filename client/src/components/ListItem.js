import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ListItem extends Component {
  
  render() {
    return(
      <Link to={'/campaign/'+this.props.id_campaign+'/'+this.props.obj.param}>{this.props.obj.name}</Link>
    )
  }
}

export default ListItem