import React, { Component } from "react";

import "./PointDistributionGrid.css";

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

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  setGridInfo() {
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

  generateRandomPoints(gridWidth, gridHeight, randomPointProp) {
    const grid = [];
    const points = [];
    let pointCount = 0;
    let totalPointCount = 0;
    // set points
    console.log("gen grid " + gridWidth + " " + gridHeight);
    //for (let row = 0; row < this.state.gridHeight; row++) {
    for (let row = 0; row < gridHeight; row++) {
      const currRow = [];
      //for (let col = 0; col < this.state.gridWidth; col++) {
      for (let col = 0; col < gridWidth; col++) {
        //if (this.getRandomArbitrary(0, 1) < this.state.randomPointProp) {
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
    console.log("points " + pointCount);
    console.log("totalPointCount " + totalPointCount);
    console.log(grid);
    //return grid;
    return points;
  }

  drawPoints(pointList, canvas, gridWidth, gridHeight, pointSize) {
    var ctx = canvas.getContext("2d");
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

  /* drawGrid(grid, canvas, gridWidth, gridHeight, pointSize) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, gridWidth * 4, gridHeight * 4);
    ctx.fillStyle = "red";
    console.log(grid);
    for (let row = 0; row < gridHeight; row++) {
      for (let col = 0; col < gridWidth; col++) {
        if (grid[row][col]) {
          ctx.beginPath();
          ctx.arc(col / 0.25, row / 0.25, pointSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }*/

  updateCanvasSize() {
    const canvas = document.getElementById("canvas");
    const canvasParent = document.getElementById("canvas").parentElement;
    //canvas.height = canvasParent.getBoundingClientRect().height - 2;
    //canvas.width = canvasParent.getBoundingClientRect().width - 2;
    canvas.width = canvasParent.offsetWidth - 2;
    canvas.height = canvasParent.offsetHeight - 2;
    //(canvas.style.borderLeft.width + canvas.style.borderRight.width);
  }

  onWindowResize() {
    this.updateCanvasSize();
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.onWindowResize());
    this.updateCanvasSize();
    this.setGridInfo();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.onWindowResize());
  }

  componentDidUpdate() {
    const canvas = document.getElementById("canvas");
    const gridWidth = Math.floor(canvas.clientWidth * 0.25);
    const gridHeight = Math.floor(canvas.clientHeight * 0.25);

    //const grid = this.generateGrid(gridWidth, gridHeight, 0.25);
    const points = this.generateRandomPoints(gridWidth, gridHeight, 0.25);
    //this.drawGrid(grid, canvas, gridWidth, gridHeight, 1);
    this.drawPoints(points, canvas, gridWidth, gridHeight, 2);
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
