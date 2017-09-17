import React, { Component, PropTypes } from 'react';

import {calcCorrelation} from "../utils/calculator";

export default class CorrelationValues extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  render() {
    const {data} = this.props;
    const xValues = data.map(d => d.value1);
    const yValues = data.map(d => d.value2);
    return (
      <div className="colelation-values">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>相関係数</th>
              <td>{calcCorrelation(xValues, yValues)}</td>
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
}
