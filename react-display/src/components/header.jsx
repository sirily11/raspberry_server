import React, { Component } from "react";

export default class Header extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <header className="mdl-layout__header mdl-layout__header--transparent">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">Title</span>
            <div className="mdl-layout-spacer" />
            <nav className="mdl-navigation" />
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">Title</span>
          <nav className="mdl-navigation" />
        </div>
      </div>
    );
  }
}
