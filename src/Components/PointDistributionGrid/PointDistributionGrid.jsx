import React, { Component } from "react";

import "./PointDistributionGrid.css";

export default class PointDistributionGrid extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidUpdate() {
    let grid = this.initializeGrid(this.props.mapSize);
  }

  render() {
    return (
      <div className="col-9 main-alg-element">
        <div className="point-distribution-grid">
          <canvas id="canvas" />
        </div>
      </div>
    );
  }
}
