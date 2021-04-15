import React, { Component } from "react";

import "./DefaultAlgorithmTitle.css";

export default class DefaultAlgorithmTitle extends Component {
  render() {
    const { title, subtitle } = this.props;

    var subtitleElement;
    if (subtitle) {
      subtitleElement = <h3>{subtitle}</h3>;
    }

    return (
      <div className="default-algorithm-title col-12 p-3">
        <h1>{title}</h1>
        {subtitleElement}
      </div>
    );
  }
}
