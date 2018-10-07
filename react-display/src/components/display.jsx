import React, { Component } from "react";

export default class Display extends Component {
  renderList() {
    //[{name:data}]
    return this.props.data.map(item => {
      return (
        <li key={item.name} className="mdl-list__item">
          <h5>{item.name}:</h5>
          <h5 className="mdl-list__item-primary-content">{item.data}</h5>
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        <ul className="demo-list-item mdl-list">{this.renderList()}</ul>
      </div>
    );
  }
}
