import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class Display extends Component {
  renderList() {
    //[{name:data}]
    return this.props.data.map(item => {
      return (
        <div key={item.name} className="col-sm-3">
          <p>
            {item.name}:{item.data}
          </p>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="row">
        <img className="video" alt="" src={this.props.videosrc} />
        <Card raised={false} className="card-display">
          <CardContent>
            <div className="row">{this.renderList()}</div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
