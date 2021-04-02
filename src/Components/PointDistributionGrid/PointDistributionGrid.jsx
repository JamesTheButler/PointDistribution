import React, { Component } from "react";

import "./PointDistributionGrid.css";

export default class PointDistributionGrid extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="col-8 main-alg-element">
        <div className="point-distribution-grid">
          {"points: " +
            this.props.pointNumber +
            ", map: " +
            this.props.mapSize +
            ", algo: " +
            this.props.algorithm}
        </div>
      </div>
    );
  }
}
