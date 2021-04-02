import React, { Component } from "react";
import Slider from "../Default/CustomSlider/CustomSlider";

import "./PointDistributionMenu.css";

export default class PointDistributionMenu extends Component {
  onSettingsChanged(newSettings) {
    if (this.props.onSettingsChanged != null) {
      this.props.onSettingsChanged(newSettings);
    }
  }

  render() {
    return (
      <div className="main-alg-element col-4">
        <div className="alg-menu point-distribution-menu">
          <h3>Settings</h3>
          <hr />
          <Slider
            id="points-number"
            caption="Number of Points"
            min="20"
            max="500"
            onChange={(newVal) => {
              this.onSettingsChanged({ pointNumber: newVal });
            }}
          />
          <Slider
            id="map-size"
            caption="Size"
            min="1"
            max="10"
            onChange={(newVal) => this.onSettingsChanged({ mapSize: newVal })}
          />
        </div>
      </div>
    );
  }
}

PointDistributionMenu.defaultProps = {
  OnSettingsChanged: null,
};
