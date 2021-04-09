import React, { Component } from "react";
import PointDistributionMenu from "./PointDistributionMenu/PointDistributionMenu.jsx";
import PointDistributionMap from "./PointDistributionMap/PointDistributionMap.jsx";

export default class PointDistribution extends Component {
  constructor() {
    super();
    this.state = {
      mapSize: 0,
      algorithm: 0,
      isAnimate: false,
    };
  }

  onMapSizeChanged(newMapSize) {
    if (newMapSize != this.state.mapSize) {
      this.setState({ mapSize: newMapSize });
    }
  }

  onAlgorithmChanged(newAlgotihm) {
    if (newAlgotihm != this.state.algorithm) {
      this.setState({ algorithm: newAlgotihm });
    }
  }

  onIsAnimateChanged(newIsAnimate) {
    if (newIsAnimate != this.state.isAnimate) {
      this.setState({ isAnimate: newIsAnimate });
    }
  }

  render() {
    return (
      <div className={"alg-row row " + this.props.className}>
        <PointDistributionMap mapSize={this.state.mapSize} algorithm={this.state.algorithm} isAnimate={this.state.isAnimate} />
        <PointDistributionMenu
          onMapSizeChanged={(newMapSize) => this.onMapSizeChanged(newMapSize)}
          onAlgorithmChanged={(newAlgotihm) => this.onAlgorithmChanged(newAlgotihm)}
          onIsAnimateChanged={(newIsAnimate) => this.onIsAnimateChanged(newIsAnimate)}
        />
      </div>
    );
  }
}
