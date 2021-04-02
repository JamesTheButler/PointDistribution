import React, { Component } from "react";
import CustomSlider from "../Default/CustomSlider/CustomSlider";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

import "./PointDistributionMenu.css";

export default class PointDistributionMenu extends Component {
  onSettingsChanged(newSettings) {
    if (this.props.onSettingsChanged != null) {
      this.props.onSettingsChanged(newSettings);
    }
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
        label: "Poisson-disk",
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
      <div className="main-alg-element col-4">
        <div className="alg-menu point-distribution-menu">
          <h3>Settings</h3>
          <hr />
          <div className="col-12 pb-2">
            <Typography id="non-linear-slider" gutterBottom>
              Map Size
            </Typography>
            <Slider
              min={0}
              max={2}
              marks={sizeMarks}
              className="col-8"
              onChange={(e, value) =>
                this.onSettingsChanged({ mapSize: value })
              }
            />
          </div>
          <div className="col-12">
            <Typography id="non-linear-slider" gutterBottom>
              Algorithm
            </Typography>
            <Slider
              min={0}
              max={2}
              marks={algorithmMarks}
              className="col-8"
              onChange={(e, value) =>
                this.onSettingsChanged({ algorithm: value })
              }
            />
          </div>
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
