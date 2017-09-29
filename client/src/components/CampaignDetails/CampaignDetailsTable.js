import React, { Component } from 'react'
import CampaignDetailsTableRow from './CampaignDetailsTableRow'

class CampaignDetailsTable extends Component {
    render() {
        return (
                <div>
                <table>
                    <thead>
                    <tr>
                        <th>Phone number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Elected Representatives</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map(function(item){
                            return <CampaignDetailsTableRow person={item} key={item.id_texters} />
                        }) }
                    </tbody>
                </table>
                </div>	
                )
    }
}

export default CampaignDetailsTable