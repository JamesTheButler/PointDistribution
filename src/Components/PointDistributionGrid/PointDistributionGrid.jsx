import React, { Component } from "react";

import { generateRandomPoints } from "../../Algorithms/RandomPoints";
import { generateEvenlySpacedRandomPoints } from "../../Algorithms/EvenlySpacedRandomPoints";

import "./PointDistributionGrid.css";

const POINT_DENSITY = 0.05;

export default class PointDistributionGrid extends Component {
  constructor() {
    super();
    this.state = {
      randomPointProp: 0.1,
      /*grid: [],
      radius: 5,
      sizeRatio: 1,
      gridWidth: 100,
      gridHeight: 100,*/
    };
  }

  setGridInfo() {
    // TODO: make pointSize, lineWidth dependant on sizeRatio
    /* const settings = [
      {
        sizeRatio: 0.05,
      },
      {
        sizeRatio: 0.15,
      },
      {
        sizeRatio: 0.45,
      },
    ];*/
    //const mapSizeModifiers = [0.05, 0.25, 0.5];
    //this.setCanvasSize();
    /*const mapSize = this.props.mapSize;
    this.setState({ sizeRatio: mapSizeModifiers[mapSize] });

    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;
    //const aspect = canvasWidth / canvasHeight;
    this.setState({
      gridWidth: Math.floor(canvasWidth * this.state.sizeRatio),
    });
    this.setState({
      gridHeight: Math.floor(canvasHeight * this.state.sizeRatio),
    });*/
  }

  /*generateRandomPoints(gridWidth, gridHeight) {
    const grid = [];
    const points = [];
    let pointCount = 0;
    let totalPointCount = 0;
    // set points
    for (let row = 0; row < gridHeight; row++) {
      const currRow = [];
      for (let col = 0; col < gridWidth; col++) {
        if (this.getRandomArbitrary(0, 1) < this.state.randomPointProp) {
          currRow.push(true);
          points.push([row, col]);
          pointCount++;
        } else {
          currRow.push(false);
        }
        totalPointCount++;
      }
      grid.push(currRow);
    }
    return points;
  }*/

  generatePoints(algorithmId, gridWidth, gridHeight) {
    switch (algorithmId) {
      case 1:
        return generateEvenlySpacedRandomPoints(
          gridWidth,
          gridHeight,
          Math.floor(gridWidth * gridHeight * POINT_DENSITY)
        );
      //case 2: return generatePoissonDiskPoints(  gridWidth, gridHeight, Math.floor(gridWidth * gridHeight * POINT_PROPABILITY);
      case 0:
      default:
        return generateRandomPoints(
          gridWidth,
          gridHeight,
          gridWidth * gridHeight * POINT_DENSITY
        );
    }
  }

  drawPoints(pointList, canvas, gridWidth, gridHeight, pointSize) {
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#2f528f";
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, gridWidth * 4, gridHeight * 4);
    for (let i = 0; i < pointList.length; i++) {
      const x = pointList[i][1] / 0.25;
      const y = pointList[i][0] / 0.25;
      if (
        x - pointSize > 0 &&
        x + pointSize < gridWidth * 4 &&
        y - pointSize > 0 &&
        y + pointSize < gridHeight * 4
      ) {
        ctx.beginPath();
        ctx.arc(x, y, pointSize, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  updateCanvasSize() {
    const canvas = document.getElementById("canvas");
    const canvasParent = document.getElementById("canvas").parentElement;
    canvas.width = canvasParent.offsetWidth - 2;
    canvas.height = canvasParent.offsetHeight - 2;
  }

  onWindowResize() {
    this.updateCanvasSize();
    this.componentDidUpdate();
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.onWindowResize());
    this.updateCanvasSize();
    this.componentDidUpdate();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.onWindowResize());
  }

  componentDidUpdate() {
    const canvas = document.getElementById("canvas");
    const gridWidth = Math.floor(canvas.clientWidth * 0.25);
    const gridHeight = Math.floor(canvas.clientHeight * 0.25);

    const points = this.generatePoints(
      this.props.algorithm,
      gridWidth,
      gridHeight
    );
    this.drawPoints(points, canvas, gridWidth, gridHeight, 3);
  }

  render() {
    return (
      <div className="col-9 main-alg-element">
        <div className="point-distribution-grid">
          <canvas id="canvas" onClick={() => this.componentDidUpdate()} />
        </div>
      </div>
    );
  }
}

PointDistributionGrid.defaultProps = {
  mapSize: 2,
  algorithm: "default",
};
