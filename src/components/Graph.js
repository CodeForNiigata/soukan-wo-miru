import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom";
import * as d3 from "d3";

export default class Graph extends Component {
  componentDidMount() {
    const {
      data,
      width,
      height,
      margin,
      favorite
    } = this.props;

    const graph = ReactDOM.findDOMNode(this.refs.chart);
    this.svg = d3.select(graph)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("class", "scatter-chart");

    this.renderChart(data);
  }

  shouldComponentUpdate (props) {
    this.svg.select("g.chart-body").remove();
    this.renderChart(props.data);
    return false;
  }

  render() {
    return (
      <svg ref="chart"></svg>
    );
  }

  renderChart(data) {
    const {
      width,
      height,
      margin,
      favorite
    } = this.props;

    const xMin = d3.min(data, function(d) { return d.value1; });
    const xMax = d3.max(data, function(d) { return d.value1; });
    const yMin = d3.min(data, function(d) { return d.value2; });
    const yMax = d3.max(data, function(d) { return d.value2; });
    const x = d3.scaleLinear()
                .domain([xMin, xMax])
                .range([0, width]);
    const y = d3.scaleLinear()
                .domain([yMin, yMax])
                .range([height, 0]);

    const chartBody = this.svg.append("g")
                              .attr("transform", `translate(${margin.left}, 0)`)
                              .attr("width", width + margin.left)
                              .attr("height", height + margin.bottom)
                              .attr("class", "chart-body");

    const xAxis = d3.axisBottom(x);
    chartBody.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr("class", "axis")
      .call(xAxis);
    const yAxis = d3.axisLeft(y);
    chartBody.append("g")
             .attr("transform", "translate(0, 0)")
             .attr("class", "axis")
             .call(yAxis);


    const div = d3.select("body")
                  .append("div")
                  .attr("class", "graph-tooltip")
                  .style("display", "none");

    const formatValue = value => {
      var _pow = Math.pow(10 , 3) ;
      return Math.round( value * _pow ) / _pow ;
    };

    const g = chartBody.append("svg:g");
    g.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
      .attr("cx", function (d, i) { return x(d.value1); } )
      .attr("cy", function (d) { return y(d.value2); } )
      .attr("r", 5)
      .attr("class", function(d) {
        let circleClassName = "point";
        if (d.id === favorite) {
          circleClassName = "favorited-point";
        }
        return circleClassName;
      })
      .on("mouseover", function(d) {
        const title = `<div class="title">${d.name}</div>`;
        const value1 = `<div>X: ${formatValue(d.value1)}</div>`;
        const value2 = `<div>Y: ${formatValue(d.value2)}</div>`;
        div.html(title + value1 + value2)
          .style("left", (d3.event.pageX + 20) + "px")
          .style("top", (d3.event.pageY - 60) + "px")
          .style("display", "block");
      })
      .on("mouseout", function(d) {
        div.style("display", "none");
      })
  }
}
