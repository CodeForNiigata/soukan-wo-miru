import React, { Component, PropTypes } from 'react';
import * as _ from "lodash";

export default class Table extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        value1: PropTypes.number,
        value2: PropTypes.number
      })
    ),
    favoraite: PropTypes.number,
    onClickFavorite: PropTypes.func
  };

  formatValue(value) {
    if (_.isNil(value)) {
      return "";
    }
    var _pow = Math.pow(10 , 3) ;
    return Math.round( value * _pow ) / _pow ;
  }

  render() {
    const {
      data,
      favorite,
      onClickFavorite
    } = this.props;
    const trs = data.map(d => {
      let favoriteClassName = "favorite glyphicon glyphicon-star-empty";
      let cityNameClassName = "";
      if (d.id == favorite) {
        favoriteClassName = "favorite glyphicon glyphicon-star";
        cityNameClassName = "favorited-name";
      }
      return (
        <tr key={d.id} onClick={() => onClickFavorite(d.id)}>
          <td><span className={favoriteClassName} /></td>
          <td><span className={cityNameClassName}>{d.name}</span></td>
          <td className="text-right">{this.formatValue(d.value1)}</td>
          <td className="text-right">{this.formatValue(d.value2)}</td>
        </tr>
      );
    });

    return (
      <table className="cities table table-striped">
        <thead>
          <tr>
            <th className="col-xs-1"></th>
            <th className="col-xs-3">都市名</th>
            <th className="col-xs-4">X</th>
            <th className="col-xs-4">Y</th>
          </tr>
        </thead>
        <tbody>
          {trs}
        </tbody>
      </table>
    );
  }
}
