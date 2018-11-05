import React, { Component } from "react";
import { Line, Circle } from "rc-progress";
import Gamepad from "./gamepadlib";

export default class GamepadComponent extends Component {
  constructor() {
    super();
    this.state = {
      accelerate: 0,
      break: 0,
      wheel: 50,
      controller: false
    };
  }

  componentWillMount() {}

  componentDidMount() {
    setInterval(this.updateGamepad.bind(this), 100);
    let canvas = document.querySelector("canvas");
    canvas.width = 100;
    canvas.height = 100;
    let c = canvas.getContext("2d");
    if (this.props.hit) {
      this.drawRobot(canvas);
      c.beginPath();
      c.arc(50, 50, 30, 0, Math.PI, true);
      c.fillStyle = "red";
      c.fill();
    } else {
      this.drawRobot(canvas);
    }
  }

  drawRobot(canvas) {
    let c = canvas.getContext("2d");
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.arc(50, 50, 30, 0, 2 * Math.PI, false);
    c.fillStyle = "green";
    c.fill();
    c.lineWidth = 5;
    c.strokeStyle = "#9e9e9e";
    c.stroke();
  }

  updateGamepad() {
    var gamepads = navigator.getGamepads
      ? navigator.getGamepads()
      : navigator.webkitGetGamepads
        ? navigator.webkitGetGamepads
        : [];
    if (gamepads[0] !== null) {
      let a = gamepads[0].axes[4] + 1;
      let b = gamepads[0].axes[3] + 1;
      let wheel = gamepads[0].axes[0] + 1;

      let pa = a / 2;
      let pb = b / 2;
      let pwheel = wheel / 2;

      this.setState({
        accelerate: pa * 100,
        break: pb * 100,
        wheel: pwheel * 100
      });

      this.props.control(pa * 100, pb * 100, pwheel * 100);
    }
  }
  render() {
    return (
      <div>
        <span>Accelerate</span>
        <Line
          percent={this.state.accelerate}
          strokeWidth="4"
          strokeColor="#e040fb"
        />
        <span>Break</span>
        <Line
          percent={this.state.break}
          strokeWidth="4"
          strokeColor="#e040fb"
        />
        <span>Wheel</span>
        <Line
          percent={this.state.wheel}
          strokeWidth="4"
          strokeColor="#d500f9"
          trailColor="#2db7f5"
          trailWidth="4"
        />
        <canvas style={{ border: "0px solid black" }} />
      </div>
    );
  }
}
