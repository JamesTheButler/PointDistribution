import React, { Component } from "react";

import { generateRandomPoints } from "../../../Algorithms/RandomPoints";
import { generateEvenlySpacedRandomPoints } from "../../../Algorithms/EvenlySpacedRandomPoints";
import { generatePoissonDiscPoints } from "../../../Algorithms/PoissonDisc";

import "./PointDistributionMap.css";

const CANVAS_ID = "canvas";
const POINT_DENSITY = 0.05;
const POINT_SIZE_MULTIPLIER = 0.75;
const LINE_WIDTH_MULTIPLIER = 0.5;
const DRAW_DELAY = 5;
const POISSON_DISC_RADIUS = 4;
const GRID_CELL_SIZE = 6;
const HIGHLIGHT_COLOR = "#2F528F";

export default class PointDistributionMap extends Component {
  drawInterval = null;

  constructor() {
    super();
    this.state = {
      algorithm: 0,
      mapSize: 1,
      isAnimate: false,
    };
  }

  getSizeRatio(mapSize) {
    switch (mapSize) {
      case 0:
      default:
        return 10;
      case 1:
        return 4;
      case 2:
        return 2;
    }
  }

  generatePoints(algorithmId, mapWidth, mapHeight) {
    const pointCount = Math.floor(mapWidth * mapHeight * POINT_DENSITY);
    switch (algorithmId) {
      case 1:
        return generateEvenlySpacedRandomPoints(mapWidth, mapHeight, GRID_CELL_SIZE);
      case 2:
        return generatePoissonDiscPoints(mapWidth, mapHeight, POISSON_DISC_RADIUS, 10);
      case 0:
        return generateRandomPoints(mapWidth, mapHeight, pointCount);
      default:
        return generateRandomPoints(mapWidth, mapHeight, pointCount);
    }
  }

  drawPointsAnimated(pointList, canvas, pointSize, lineWidth, delay) {
    const sizeModifier = this.getSizeRatio(this.props.mapSize);
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = HIGHLIGHT_COLOR;
    ctx.lineWidth = lineWidth;
    // clean up previous render
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    clearInterval(this.drawInterval);
    var i = 0;
    // setup "this" for interval func
    var thisClass = this;
    this.drawInterval = setInterval(function () {
      // cancel inteval when all points are drawn
      if (i > pointList.length - 1) {
        clearInterval(thisClass.drawInterval);
      } else {
        // convert point coords from grid space to canvas space and draw
        const point = [pointList[i][0] * sizeModifier, pointList[i][1] * sizeModifier];
        thisClass.drawPoint(canvas, point, pointSize, lineWidth);
        i++;
      }
    }, delay);
  }

  drawPoints(pointList, canvas, pointSize, lineWidth) {
    const sizeModifier = this.getSizeRatio(this.props.mapSize);
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = HIGHLIGHT_COLOR;
    ctx.lineWidth = lineWidth;
    // clean up previous render
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    clearInterval(this.drawInterval);
    // start new render
    for (let i = 0; i < pointList.length; i++) {
      // convert point coords from grid space to canvas space and draw
      const point = [pointList[i][0] * sizeModifier, pointList[i][1] * sizeModifier];
      this.drawPoint(canvas, point, pointSize, lineWidth);
    }
  }

  drawPoint(canvas, point, pointSize, lineWidth) {
    var ctx = canvas.getContext("2d");
    // ignore points that are too close to the edges (looks more neat)
    if (
      point[0] - pointSize - lineWidth > 0 &&
      point[0] + pointSize + lineWidth < canvas.clientWidth &&
      point[1] - pointSize - lineWidth > 0 &&
      point[1] + pointSize + lineWidth < canvas.clientHeight
    ) {
      //draw point
      ctx.beginPath();
      ctx.arc(point[0], point[1], pointSize, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  componentDidUpdate() {
    const canvas = document.getElementById(CANVAS_ID);
    const sizeModifier = this.getSizeRatio(this.props.mapSize);
    const mapWidth = Math.floor(canvas.clientWidth / sizeModifier);
    const mapHeight = Math.floor(canvas.clientHeight / sizeModifier);
    console.log("mapsize: " + this.props.mapSize + ", algo: " + this.props.algorithm + ", isAnimate:" + this.props.isAnimate);
    console.log("Map: " + mapWidth + "x" + mapHeight);
    const points = this.generatePoints(this.props.algorithm, mapWidth, mapHeight);
    if (this.props.isAnimate) {
      this.drawPointsAnimated(points, canvas, POINT_SIZE_MULTIPLIER * sizeModifier, LINE_WIDTH_MULTIPLIER * sizeModifier, DRAW_DELAY);
    } else {
      this.drawPoints(points, canvas, POINT_SIZE_MULTIPLIER * sizeModifier, LINE_WIDTH_MULTIPLIER * sizeModifier);
    }
  }

  updateCanvasSize() {
    const canvas = document.getElementById(CANVAS_ID);
    const canvasParent = document.getElementById(CANVAS_ID).parentElement;
    canvas.width = canvasParent.offsetWidth; //padding + border
    canvas.height = canvasParent.offsetHeight; //padding + border
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
      <div className="main-alg-element">
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
