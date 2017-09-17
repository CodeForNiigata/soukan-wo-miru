import React, { Component, PropTypes } from 'react';

export default class Dropdown extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      })
    ),
    className: PropTypes.string,
    selected: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const {data, className, selected, onChange} = this.props;
    const options = data.map(d => {
      return <option key={d.id} value={d.id}>{d.name}</option>;
    });

    const style = {maxWidth: "24em"};
    const classNames = "form-control " + className;
    return (
      <select className={classNames} style={style} value={selected} onChange={e => onChange(e.target.value)}>
        {options}
      </select>
    );
  }
}
