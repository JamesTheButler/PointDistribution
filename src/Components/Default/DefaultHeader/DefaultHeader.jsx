import React, { Component } from "react";
import "./DefaultHeader.css";
import "bootstrap/dist/css/bootstrap.css";
export default class DefaultHeader extends Component {
  render() {
    return (
      <header className="default-header">
        <nav className="navbar">
          <div className="container-fluid">
            <a className="portfolio-link" href="http://www.tom.ille-web.de">
              Back to Portfolio
            </a>
          </div>
        </nav>
      </header>
    );
  }
}
