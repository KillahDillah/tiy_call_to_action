import React, { Component } from 'react'
import {Authorize} from '../lib/auth'

class Dashboard extends Component {
  render() {
    return(
      <div id="footer" class="wrapper">
        <div class="inner">
          <section>
            <div class="box">
              <div class="content">
                <h2 class="align-center">Your active campaigns:</h2>
                <hr />
                <table>
                    <tr>
                      <th>Campaign Name</th>
                      <th>Description</th>
                      <th>Creation Date</th>
                    </tr>
                    <tr>
                      <td>Penguins</td>
                      <td>Keep penguins out of seimming pools</td>
                      <td>September 18th 2017</td>
                    </tr>
                    <tr>
                      <td>Las Vegas Rabbits</td>
                      <td>Stop illegal dumping of pet rabbits in Las Vegas</td>
                      <td>September 1, 2017</td>
                    </tr>
                    <tr>
                      <td>Ice Cream Sundays</td>
                      <td>A petition for free icecream on Sundays at the library</td>
                      <td>April 1, 2017</td>
                    </tr>
                </table>
                  <ul class="actions align-center">
                    <li><input value="Create a New Campaign" class="button special" type="Submit"/></li>
                  </ul>
              </div>
            </div>
          </section>
          <div class="copyright">
            &copy; 2017 by the Call to Action Team
          </div>
        </div>
      </div>
    )
  }
}

export default Authorize(Dashboard)