import React, { Component } from 'react';
import * as _ from "lodash";
import './App.css';

// components
import Dropdown from "./components/Dropdown";
import ModeSelector from "./components/ModeSelector";
import MetaInfo from "./components/MetaInfo";
import Table from "./components/Table";
import Graph from "./components/Graph";
import CorrelationValues from "./components/CorrelationValues";

// json
import categories from "../data/categories.json";
import targets from "../data/targets.json";
import items from "../data/items.json";
import data from "../data/data.json";

class App extends Component {
  constructor() {
    super();
    this.state = {
      mode: "table",
      favorite: null,
      selectedCategory1: 0,
      selectedCategory2: 1,
      selectedValue1: 2,
      selectedValue2: 3,
      categories,
      targets,
      items,
      data
    };
  }

  render() {
    const onChangeCategoryDropdown1 = v => {
      const value1Items = this.state.items.filter(i => i["category"] == v);
      this.setState({selectedCategory1: parseInt(v, 10), selectedValue1: value1Items[0].id});
    };
    const onChangeCategoryDropDown2 = v => {
      const value2Items = this.state.items.filter(i => i["category"] == v);
      this.setState({selectedCategory2: parseInt(v, 10), selectedValue2: value2Items[0].id});
    };
    const categoryDropdown1Props = {
      data: this.state.categories,
      className: "category-dropdown",
      selected: this.state.selectedCategory1,
      onChange: onChangeCategoryDropdown1
    };
    const categoryDropdown2Props = {
      data: this.state.categories,
      className: "category-dropdown",
      selected: this.state.selectedCategory2,
      onChange: onChangeCategoryDropDown2
    };
    const onChangeValueDropdown1 = v => this.setState({selectedValue1: parseInt(v, 10)});
    const onChangeValueDropDown2 = v => this.setState({selectedValue2: parseInt(v, 10)});
    const value1Items = this.state.items.filter(i => i["category"] == this.state.selectedCategory1);
    const value2Items = this.state.items.filter(i => i["category"] == this.state.selectedCategory2);
    const value1Item = _.find(this.state.items, {id: this.state.selectedValue1});
    const value2Item = _.find(this.state.items, {id: this.state.selectedValue2});
    const valueDropdown1Props = {
      data: value1Items,
      selected: this.state.selectedValue1,
      onChange: onChangeValueDropdown1
    };
    const valueDropdown2Props = {
      data: value2Items,
      selected: this.state.selectedValue2,
      onChange: onChangeValueDropDown2
    };
    const onChangeMode = mode => this.setState({mode});
    const modeSelectorProps = {
      mode: this.state.mode,
      onChange: onChangeMode
    };

    const v1s = _.find(this.state.data, {id: parseInt(this.state.selectedValue1, 10)});
    const v2s = _.find(this.state.data, {id: parseInt(this.state.selectedValue2, 10)});
    const filtered = [];
    const data = this.state.targets.map(d => {
      const v1 = _.find(v1s.data, {id: d.id});
      const v2 = _.find(v2s.data, {id: d.id});
      const obj = {
        id: d.id,
        name: d.name,
        value1: !_.isNil(v1.value) ? parseFloat(v1.value) : null,
        value2: !_.isNil(v2.value) ? parseFloat(v2.value) : null
      };

      if (!_.isNil(v1.value) && !_.isNil(v2.value)) {
        filtered.push(obj);
      }
      return obj;
    });

    let dataView;
    if (this.state.mode === "table") {
      const tableData1 = [];
      const tableData2 = [];
      const tableData3 = [];
      const dataLength = data.length;
      let count = 0;
      data.forEach(d => {
        if (count <= dataLength / 3) {
          tableData1.push(d);
        } else if (count <= dataLength * 2 / 3) {
          tableData2.push(d);
        } else {
          tableData3.push(d);
        }
        count += 1;
      });
      const onClickFavorite = (f) => { this.setState({favorite: f}) };
      dataView = (
        <div className="row">
          <div className="col-xs-4">
            <Table data={tableData1} favorite={this.state.favorite} onClickFavorite={onClickFavorite} />
          </div>
          <div className="col-xs-4">
            <Table data={tableData2} favorite={this.state.favorite} onClickFavorite={onClickFavorite} />
          </div>
          <div className="col-xs-4">
            <Table data={tableData3} favorite={this.state.favorite} onClickFavorite={onClickFavorite} />
          </div>
        </div>
      );
    } else {
      const bodyWidth = window.innerWidth;
      const bodyHeight = window.innerHeight;
      const margin = {top: 20, right: 120, bottom: 20, left: 80};
      dataView = (
        <Graph data={filtered} width={bodyWidth - 300} height={bodyHeight - 260} margin={margin} favorite={this.state.favorite} />
      );
    }

    return (
      <div className="container-fluid">
        <div className="header">
          <h1>相関をみる</h1>
        </div>
        <div className="row">
          <div className="col-xs-5 form-inline">
            <label className="value-label">X</label>
            <Dropdown {...categoryDropdown1Props} />
            <Dropdown {...valueDropdown1Props} />
          </div>
          <div className="col-xs-5 form-inline">
            <label className="value-label">Y</label>
            <Dropdown {...categoryDropdown2Props} />
            <Dropdown {...valueDropdown2Props} />
          </div>
          <div className="col-xs-2">
            <ModeSelector {...modeSelectorProps} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-5">
            <MetaInfo {...value1Item} />
          </div>
          <div className="col-xs-5">
            <MetaInfo {...value2Item} />
          </div>
          <div className="col-xs-2">
            <CorrelationValues data={filtered} />
          </div>
        </div>
        {dataView}
      </div>
    );
  }
}

export default App;
