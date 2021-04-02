import React, { Component } from "react";
import PointDistributionMenu from "../PointDistributionMenu/PointDistributionMenu.jsx";
import PointDistributionGrid from "../PointDistributionGrid/PointDistributionGrid.jsx";

export default class PointDistribution extends Component {
  constructor() {
    super();
    this.state = {
      pointNumber: 0,
      mapSize: 0,
      algorithm: "default",
    };
  }

  onSettingsChanged(newSettings) {
    if (newSettings.pointNumber != null)
      this.setState({ pointNumber: newSettings.pointNumber });

    if (newSettings.mapSize != null)
      this.setState({ mapSize: newSettings.mapSize });

    if (newSettings.algorithm != null)
      this.setState({ algorithm: newSettings.algorithm });
  }

  updateState(e) {
    this.setState({ val: e.target.value });
  }

  render() {
    return (
      <div className="row">
        <PointDistributionGrid
          pointNumber={this.state.pointNumber}
          mapSize={this.state.mapSize}
          algorithm={this.state.algorithm}
        />
        <PointDistributionMenu
          onSettingsChanged={(newSettings) =>
            this.onSettingsChanged(newSettings)
          }
        />
        {console.log("this. onsettings changed " + this.onSettingsChanged)}
      </div>
    );
  }
}
