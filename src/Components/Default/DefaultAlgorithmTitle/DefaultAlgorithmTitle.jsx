import React, { Component } from "react";

import "./DefaultAlgorithmTitle.css";

export default class DefaultAlgorithmTitle extends Component {
  render() {
    const { title, subtitle } = this.props;
    return (
      <div className="default-algorithm-title col-12 p-3">
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>
    );
  }
}

/*<Typography id="non-linear-slider" variant="h3" gutterBottom>
{title}
</Typography>
<Typography id="non-linear-slider" variant="subtitle1" gutterBottom>
{subtitle}
</Typography>*/
