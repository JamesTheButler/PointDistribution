import React, { Component } from "react";
//import CustomSlider from "../Default/CustomSlider/CustomSlider";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import "./PointDistributionMenu.css";

export default class PointDistributionMenu extends Component {
  state = {
    algDesc: "",
    algTitle: "",
  };

  onSettingsChanged(newSettings) {
    if (this.props.onSettingsChanged != null) {
      this.props.onSettingsChanged(newSettings);
    }
  }

  updateAlgorithmDescription(algoId) {
    const algorightmInfo = [
      {
        title: "Fully Random Scatter",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown" +
          " printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        title: "My Custom Algorithm",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown" +
          " printer took a galley of type and scrambled it to make a type specimen book.",
      },
      {
        title: "Poisson-Disc",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown" +
          " printer took a galley of type and scrambled it to make a type specimen book.",
      },
    ];

    if (algoId >= algorightmInfo.length) return;

    this.setState({
      algTitle: algorightmInfo[algoId].title,
      algDesc: algorightmInfo[algoId].description,
    });
  }

  render() {
    const algorithmMarks = [
      {
        value: 0,
        label: "Fully Random",
      },
      {
        value: 1,
        label: "mine",
      },
      {
        value: 2,
        label: "Poisson-Disc",
      },
    ];

    const sizeMarks = [
      {
        value: 0,
        label: "Small",
      },
      {
        value: 1,
        label: "Medium",
      },
      {
        value: 2,
        label: "Large",
      },
    ];

    return (
      <div className="main-alg-element col-3">
        <div className="alg-menu point-distribution-menu">
          <h3>Settings</h3>
          <hr class="styled-hr" />
          <div className="col-12 settings-slider">
            <Typography id="non-linear-slider" gutterBottom>
              Map Size
            </Typography>
            <Slider
              defaultValue={0}
              min={0}
              step={1}
              max={2}
              marks={sizeMarks}
              className="col-8"
              onChange={(e, value) =>
                this.onSettingsChanged({ mapSize: value })
              }
            />
          </div>
          <div className="col-12 settings-slider">
            <Typography id="non-linear-slider" gutterBottom>
              Algorithm
            </Typography>
            <Slider
              min={0}
              step={1}
              max={2}
              marks={algorithmMarks}
              className="col-8"
              onChange={(e, value) => {
                this.onSettingsChanged({ algorithm: value });
                this.updateAlgorithmDescription(value);
              }}
            />
          </div>
          <hr class="styled-hr" />
          <Typography id="non-linear-slider" variant="h6" gutterBottom>
            {this.state.algTitle}
          </Typography>
          <Typography id="non-linear-slider" variant="body1" gutterBottom>
            {this.state.algDesc}
          </Typography>
        </div>
      </div>
    );
  }
}

PointDistributionMenu.defaultProps = {
  OnSettingsChanged: null,
};

/*
<CustomSlider
            id="points-number"
            caption="Number of Points"
            min="20"
            max="500"
            onChange={(newVal) => {
              this.onSettingsChanged({ pointNumber: newVal });
            }}
          />
 <CustomSlider
            id="map-size"
            caption="Size"
            min="1"
            max="10"
            onChange={(newVal) => this.onSettingsChanged({ mapSize: newVal })}
          />

          */
