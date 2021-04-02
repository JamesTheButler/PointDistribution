import React, { Component } from "react";
import "./DefaultHeader.css";
import "bootstrap/dist/css/bootstrap.css";

export default class DefaultHeader extends Component {
  render() {
    return (
      <header className="default-header">
        <nav className="navbar">
          <div className="container-fluid">
            <a className="button" id="to-portfolio" href="www.tom.ille-web.de">
              To Portfolio
            </a>
            {
              //<a className="button" id="to-algorithm-gallery">
              //To Gallery
              //</div></a>
            }
          </div>
        </nav>
      </header>
    );
  }
}
