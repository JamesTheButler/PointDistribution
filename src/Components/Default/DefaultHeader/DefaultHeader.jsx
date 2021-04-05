import React, { Component } from "react";
import "./DefaultHeader.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "../../../../src/logo.png";
export default class DefaultHeader extends Component {
  render() {
    return (
      <header className="default-header">
        <nav className="navbar">
          <div className="container-fluid">
            <a
              className="button portfolio-link"
              href="http://www.tom.ille-web.de"
            >
              <img className="logo" src={logo} />
              Portfolio
            </a>
          </div>
        </nav>
      </header>
    );
  }
}
