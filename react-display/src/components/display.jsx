import React, { Component } from "react";

export default class Display extends Component {
  renderList() {
      //[{name:data}]
      return this.props.data.map()
  }
  render() {
    return (
      <div>
        <ul className="demo-list-item mdl-list">
          <li className="mdl-list__item">
            <span className="mdl-list__item-primary-content">
              Bryan Cranston
            </span>
          </li>
          <li className="mdl-list__item">
            <span className="mdl-list__item-primary-content">Aaron Paul</span>
          </li>
          <li className="mdl-list__item">
            <span className="mdl-list__item-primary-content">Bob Odenkirk</span>
          </li>
        </ul>
      </div>
    );
  }
}
