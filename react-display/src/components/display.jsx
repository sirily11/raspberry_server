import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default class Display extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let video = this.refs.video;
    let canvas = this.refs.canvas;
    let radius = video.offsetWidth / 30;
    let width = video.offsetWidth / 5;

    canvas.width = width;
    canvas.height = 100;
    canvas.style.right = video.offsetLeft;
    canvas.style.top = video.offsetTop;

    let ctx = canvas.getContext("2d");
    this.drawCircle(ctx, width, radius);
    this.updatePoint(ctx, width, radius);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pointTo !== prevProps.pointTo) {
      let video = this.refs.video;
      let canvas = this.refs.canvas;
      let radius = video.offsetWidth / 30;
      let width = video.offsetWidth / 5;
      let ctx = canvas.getContext("2d");
      this.drawCircle(ctx, width, radius);
      this.updatePoint(ctx, width, radius);
    }
  }

  drawCircle(ctx, width, radius) {
    ctx.beginPath();
    ctx.arc(width - radius - 10, radius + 10, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = "green";
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.stroke();
  }

  updatePoint(ctx, width, radius) {
    let x = width - radius - 10;
    let y = radius + 10;
    let rx = Math.cos(this.props.pointTo + Math.PI / 2) * radius;
    let ry = Math.sin(this.props.pointTo + Math.PI / 2) * radius;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - rx, y - ry);
    ctx.fillStyle = "red";
    ctx.stroke();
    ctx.closePath();
  }

  renderList() {
    //[{name:data}]
    return this.props.data.map(item => {
      return (
        <div key={item.name} className="col-3">
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
        <canvas
          ref="canvas"
          style={{ border: "0px solid black", position: "absolute" }}
        />
        <img ref="video" className="video" alt="" src={this.props.videosrc} />
        <Card raised={false} className="card-display">
          <CardContent>
            <div className="row">{this.renderList()}</div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
