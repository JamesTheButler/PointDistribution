import React, { Component } from "react";

import "./PointDistributionGrid.css";

export default class PointDistributionGrid extends Component {
  constructor() {
    super();
    this.state = {};
  }

  // mapsize 1 /20
  // mapsize 2 /10
  // mapsize 3 /5

  componentDidUpdate() {
    const mapSizeModifiers = [0.05, 0.25, 0.5];

    const mapSize = this.props.mapSize;
    const canvas = document.getElementById("canvas");
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    //const aspect = canvasWidth / canvasHeight;
    const grid = [];
    const width = Math.floor(canvasWidth * mapSizeModifiers[mapSize]);
    const height = Math.floor(canvasHeight * mapSizeModifiers[mapSize]);
    console.log(canvasWidth + " x " + canvasHeight);
    console.log(width + " x " + height);

    for (let row = 0; row < height; row++) {
      const currRow = [];
      for (let col = 0; col < width; col++) {
        currRow.push(false);
      }
      grid.push(currRow);
    }
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
