import React, { Component } from 'react'

class Letter extends Component {
  render() {
    return(
      <div>
        <div>
        (enter date)
        </div>
        <div>
        <p>From: (texter)</p>
        </div>
        <div>
        <p> To: (congressperson) </p>
        </div>
        <div class="dropdown">
          <select>
            <option value="dear">Dear</option>
            <option value="hello">Hello</option>
          </select>
        </div>
        <div>
          <p> (congressperson) </p>
          <p> The purpose of this letter is to inform you of my support for (campaign). As an elected official, please consider my vote and support for (campaign). </p>
        </div>
        <div class="dropdown">
          <select>
            <option value="sincerely">Sincerely</option>
            <option value="respects">Respects</option>
            <option value="regards">Regards</option>
          </select>
        </div>
        <div>
          <p>(texter)</p>
        </div>
        <button type="submit">Send</button>
      </div>
    )
  }
}

export default Letter