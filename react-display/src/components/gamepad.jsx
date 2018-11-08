import React, { Component } from "react";
import { Line, Circle } from "rc-progress";

export default class GamepadComponent extends Component {
  constructor() {
    super();
    this.state = {
      gamepad: null,
      accelerate: 0,
      break: 0,
      wheel: 50,
      controller: false
    };
  }

  componentWillMount() {}

  componentDidMount() {
    window.addEventListener("gamepadconnected", e => {
      this.setState({ gamepad: e.gamepad });
      setInterval(this.updateGamepad.bind(this), 100);
      this.props.updateMsg("Gamepad has connected");
    });
    window.addEventListener("gamepaddisconnected", () => {
      this.setState({ gamepad: null });
      this.props.updateMsg("Gamepad has disconnected");
    });
  }

  updateGamepad() {
    let gamepad = navigator.getGamepads()[0];
    if (this.state.gamepad !== null) {
      let a = gamepad.axes[4] + 1;
      let b = gamepad.axes[3] + 1;
      let wheel = gamepad.axes[0] + 1;

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
      </div>
    );
  }
}
