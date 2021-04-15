import React, { Component } from "react";
import "./DefaultHeader.css";

export default class DefaultHeader extends Component {
  render() {
    return (
      <header className="default-header">
        <a className="portfolio-link" href="http://www.tom.ille-web.de">
          Back to Portfolio
        </a>
      </header>
    );
  }
}
