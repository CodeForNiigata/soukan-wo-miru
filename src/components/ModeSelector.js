import React, { Component, PropTypes } from 'react';

export default class ModeSelector extends Component {
  static propTypes = {
    mode: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const {mode, onChange} = this.props;
    const tableProps = {
      className: mode === "table" ? "btn btn-info active" : "btn btn-info",
      onClick: e => onChange("table")
    };
    const graphProps = {
      className: mode === "graph" ? "btn btn-info active" : "btn btn-info",
    onClick: e => onChange("graph")
    };
    return (
      <div className="btn-group">
        <button {...tableProps}>
          <span className="glyphicon glyphicon-th" style={{paddingRight: "1em"}} />
          表
        </button>
        <button {...graphProps}>
          <span className="glyphicon glyphicon-stats" style={{paddingRight: "1em"}} />
          散布図
        </button>
      </div>
    );
  }
}
