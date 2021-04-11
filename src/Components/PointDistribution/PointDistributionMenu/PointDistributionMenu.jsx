import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";

import "./PointDistributionMenu.css";

export default class PointDistributionMenu extends Component {
  state = {
    algTitle: "Fully Random Scatter",
    algDesc:
      "The points are randomly scattered across the image. The scatter is very uneven. There are large clumps of points and areas of very low point density.",
    link: "",
    link_title: "",
  };

  updateAlgorithmDescription(algoId) {
    const algorightmInfo = [
      {
        title: "Fully Random Scatter",
        description:
          "The points are randomly scattered across the image. The scatter is very uneven. There are large clumps of points and areas of very low point density.",
      },
      {
        title: "Randomized Grid",
        description:
          "My Custom Algorithm. The image is discretized into a uniform grid. One point gets randomly placed within each cell. This scatter is overall much more even than the random scatter." +
          " Points can still be generated close together in clumps of up to four points.",
      },
      {
        title: "Poisson-Disc",
        link: "https://www.jasondavies.com/poisson-disc/",
        link_title: "Based on Jason Davies' implementation",
        description:
          "Poisson-Disc ensures a minimal distance between each point. Whenever a new point is considered, it is checked against its neighbours to ensure the minimal distance." +
          " To reduce the computational cost a grid is used in the background. New points then have to only be checked" +
          " against close grid cells. This method produces a very even scatter without any clumps.",
      },
    ];

    if (algoId >= algorightmInfo.length) return;

    this.setState({
      algTitle: algorightmInfo[algoId].title,
      algDesc: algorightmInfo[algoId].description,
      link: algorightmInfo[algoId].link,
      link_title: algorightmInfo[algoId].link_title,
    });
  }

  render() {
    const algorithmMarks = [
      { value: 0, label: "Random" },
      { value: 1, label: "Random Grid" },
      { value: 2, label: "Poisson-Disc" },
    ];

    const sizeMarks = [
      { value: 0, label: "Small" },
      { value: 1, label: "Medium" },
      { value: 2, label: "Large" },
    ];

    var algLink;
    if (this.state.link && this.state.link_title) {
      algLink = (
        <div className="algorithm-link">
          <a href={this.state.link} target="_blank" rel="noreferrer">
            {this.state.link_title}
          </a>
        </div>
      );
    }

    return (
      <div className="alg-menu">
        <h2 id="settings-heading">Settings</h2>
        <hr className="settings-menu" />
        <div className="settings-slider">
          <h4>Map Size</h4>
          <Slider
            defaultValue={0}
            min={0}
            step={1}
            max={2}
            marks={sizeMarks}
            className="col-8"
            onChange={(e, value) => this.props.onMapSizeChanged(value)}
          />
        </div>
        <div className="settings-slider">
          <h4>Algorithm</h4>
          <Slider
            min={0}
            step={1}
            max={2}
            marks={algorithmMarks}
            className="col-8"
            onChange={(e, value) => {
              this.props.onAlgorithmChanged(value);
              this.updateAlgorithmDescription(value);
            }}
          />
        </div>
        <div className="">
          <h4>Animate</h4>
          <Switch onChange={(e, checked) => this.props.onIsAnimateChanged(checked)} />
        </div>
        <hr className="settings-menu" />
        <div className="alg-description">
          <h6>{this.state.algTitle}</h6>
          {algLink}
          <div>{this.state.algDesc}</div>
        </div>
      </div>
    );
  }
}

PointDistributionMenu.defaultProps = {
  OnSettingsChanged: null,
};
