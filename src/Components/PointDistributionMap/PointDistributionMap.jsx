import React, { Component } from "react";

import { generateRandomPoints } from "../../Algorithms/RandomPoints";
import { generateEvenlySpacedRandomPoints } from "../../Algorithms/EvenlySpacedRandomPoints";
import { generatePoissonDiscPoints } from "../../Algorithms/PoissonDisc";

import "./PointDistributionMap.css";

const CANVAS_ID = "canvas";

const POINT_DENSITY = 0.05;
const POINT_SIZE_MULTIPLIER = 0.75;
const LINE_WIDTH_MULTIPLIER = 0.5;
const DRAW_DELAY_MULTIPLIER = 10;
const POISSON_DISC_RADIUS_MULTIPLIER = 50;
const HIGHLIGHT_COLOR = "#2F528F";

export default class PointDistributionMap extends Component {
  drawInterval = null;

  constructor() {
    super();
    this.state = {};
  }

  getSizeRatio(mapSize) {
    switch (mapSize) {
      case 0:
      default:
        return 0.1;
      case 1:
        return 0.25;
      case 2:
        return 0.45;
    }
  }

  generatePoints(algorithmId, mapWidth, mapHeight) {
    const sizeModifier = this.getSizeRatio(this.props.mapSize);
    const pointCount = Math.floor(mapWidth * mapHeight * POINT_DENSITY);
    switch (algorithmId) {
      case 1:
        return generateEvenlySpacedRandomPoints(mapWidth, mapHeight, pointCount);
      case 2:
        return generatePoissonDiscPoints(mapWidth, mapHeight, POISSON_DISC_RADIUS_MULTIPLIER * sizeModifier, 10);
      case 0:
      default:
        return generateRandomPoints(mapWidth, mapHeight, pointCount);
    }
  }

  drawPoints(pointList, canvas, pointSize, lineWidth, delay) {
    const sizeModifier = this.getSizeRatio(this.props.mapSize);
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = HIGHLIGHT_COLOR;
    ctx.lineWidth = lineWidth;

    // clean up previous render
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    clearInterval(this.drawInterval);

    // start new render
    var i = 0;
    var thisClass = this;
    console.log(this);
    console.log("drawinterval 1 " + this.drawInterval);
    var interval = (this.drawInterval = setInterval(function () {
      i++;
      if (i >= pointList.length - 1) {
        clearInterval(thisClass.drawInterval);
      }
      // points to canvas space
      const x = pointList[i][0] / sizeModifier;
      const y = pointList[i][1] / sizeModifier;
      // ignore points that are too close to the edges
      if (
        x - pointSize - lineWidth > 0 &&
        x + pointSize + lineWidth < canvas.clientWidth &&
        y - pointSize - lineWidth > 0 &&
        y + pointSize + lineWidth < canvas.clientHeight
      ) {
        ctx.beginPath();
        ctx.arc(x, y, pointSize, 0, Math.PI * 2);
        ctx.stroke();
      }
    }, delay));
  }

  //draws
  /*drawPoints(pointList, canvas, pointSize, lineWidth) {
    const sizeModifier = this.getSizeRatio(this.props.mapSize);
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = HIGHLIGHT_COLOR;
    ctx.lineWidth = lineWidth;

    // clean up previous render
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    clearInterval(this.drawInterval);

    // start new render
    for (let i = 0; i < pointList.length; i++) {
      // points to canvas space
      const x = pointList[i][0] / sizeModifier;
      const y = pointList[i][1] / sizeModifier;
      // ignore points that are too close to the edges
      if (
        x - pointSize - lineWidth > 0 &&
        x + pointSize + lineWidth < canvas.clientWidth &&
        y - pointSize - lineWidth > 0 &&
        y + pointSize + lineWidth < canvas.clientHeight
      ) {
        ctx.beginPath();
        ctx.arc(x, y, pointSize, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }*/

  componentDidUpdate() {
    const canvas = document.getElementById(CANVAS_ID);
    const sizeModifier = this.getSizeRatio(this.props.mapSize);
    const mapWidth = Math.floor(canvas.clientWidth * sizeModifier);
    const mapHeight = Math.floor(canvas.clientHeight * sizeModifier);
    console.log("Map: " + mapWidth + "x" + mapHeight);
    const points = this.generatePoints(this.props.algorithm, mapWidth, mapHeight);
    console.log(points);
    this.drawPoints(points, canvas, POINT_SIZE_MULTIPLIER / sizeModifier, LINE_WIDTH_MULTIPLIER / sizeModifier, DRAW_DELAY_MULTIPLIER / sizeModifier);
  }

  updateCanvasSize() {
    const canvas = document.getElementById(CANVAS_ID);
    const canvasParent = document.getElementById(CANVAS_ID).parentElement;
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
    clearInterval(this.drawInterval);
  }

  render() {
    return (
      <div className="col-9 main-alg-element">
        <div className="point-distribution-map">
          <canvas id={CANVAS_ID} onClick={() => this.componentDidUpdate()} />
        </div>
      </div>
    );
  }
}

PointDistributionMap.defaultProps = {
  mapSize: 0,
  algorithm: 0,
};
