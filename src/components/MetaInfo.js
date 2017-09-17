import React, { Component, PropTypes } from 'react';

export default class MetaInfo extends Component {
  static propTypes = {
    unit: PropTypes.string,
    season: PropTypes.string,
    source: PropTypes.string
  };

  render() {
    const {
      unit,
      season,
      source
    } = this.props;

    return (
      <div className="meta">
        <div>
          <div className="unit">
            <span>単位：</span>
            <span>{unit}</span>
          </div>
          <div className="season">
            <span>時期：</span>
            <span>{season}</span>
          </div>
        </div>
        <div className="source">
          <span>出典：</span>
          <span>{source}</span>
        </div>
      </div>
    );
  }
}
