import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

import "./DefaultAlgorithmTitle.css";

export default class DefaultAlgorithmTitle extends Component {
  render() {
    const { title, subtitle } = this.props;
    return (
      <div className="default-algorithm-title col-12 p-3">
        <Typography id="non-linear-slider" variant="h3" gutterBottom>
          {title}
        </Typography>
        <Typography id="non-linear-slider" variant="subtitle" gutterBottom>
          {subtitle}
        </Typography>
      </div>
    );
  }
}
