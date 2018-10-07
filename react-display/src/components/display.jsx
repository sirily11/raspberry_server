import React, { Component } from "react";

export default class Display extends Component {
  renderList() {
    //[{name:data}]
    return this.props.data.map(item => {
      return (
        <div key={item.name} className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>
              <h3 className="card-title">{item.data}</h3>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div className="row">{this.renderList()}</div>;
  }
}
