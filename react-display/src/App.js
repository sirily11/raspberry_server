import React, { Component } from "react";
import Display from "./components/display";
import GamepadComponent from "./components/gamepad";
import Input from "./components/input";
import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import Snackbar from "@material-ui/core/Snackbar";
import WarningIcon from "@material-ui/icons/Warning";
import SettingsIcon from "@material-ui/icons/Settings";
import StepperInstruction from "./components/stepper";
import Settings from "./components/settings";
import { Icon, Toolbar } from "@material-ui/core";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pointTo: 0,
      connected: true,
      videosrc: "",
      errMsg: "",
      hit: false,
      accelerate: false,
      turning: false,
      showSetting: false
    };
    this.sensor = "";
    this.showText = "";
    this.video = "";
    this.controller = "";
  }

  componentDidMount() {
    //get the sensor hat's data
    // this.ws = new WebSocket("ws://" + document.domain + ":5000/update");
    this.sensor = new WebSocket("ws://192.168.86.174:5000/update");
    //show data on the sensor hat
    this.showText = new WebSocket("ws://192.168.86.174:5000/showText");
    // this.showText = new WebSocket("ws://" + document.domain + ":5000/showText");
    //get the websocket data
    this.video = new WebSocket("ws://192.168.86.174:5000/video");
    this.controller = new WebSocket("ws://192.168.86.174:5000/control");
    this.initWebsocket();
  }

  initWebsocket() {
    this.sensor.onmessage = event => {
      let d = JSON.parse(event.data);
      let pointTo = d[5].data * (Math.PI / 180);
      this.setState({ data: JSON.parse(event.data), pointTo: pointTo });
    };

    // setInterval(this.getUpdate.bind(this), 1000);

    this.video.onerror = e => {
      let errMsg = this.state.errMsg;
      errMsg += "Cannot connect to the sensor data server\n.";
      this.setState({
        errMsg: errMsg
      });
    };

    this.controller.onerror = e => {
      this.setState({ connected: false });
    };
    this.controller.onmessage = e => {
      console.log(e.data);
    };

    this.controller.onopen = e => {
      console.log("Open");
      this.setState({ connected: true });
    };

    this.video.onmessage = event => {
      let videosrc = "data:image/jpg;base64," + event.data;
      this.setState({
        videosrc: videosrc
      });
    };

    this.video.onerror = e => {
      let errMsg = this.state.errMsg;
      errMsg += "Cannot connect to the video cam server\n.";
      this.setState({ errMsg: errMsg });
    };
  }

  getUpdate() {
    this.sensor.send("get");
  }

  updateTextHandler(text) {
    this.showText.send(text);
  }

  controlRobot(accel, brek, wheel, cmd = null) {
    try {
      if (this.state.connected) {
        if (accel > 22 && !this.state.accelerate) {
          this.controller.send(JSON.stringify({ moving: "w", settings: null }));

          this.setState({
            accelerate: true
          });
        } else if (brek > 22) {
          this.controller.send(JSON.stringify({ moving: "s", settings: null }));
          this.setState({ accelerate: false });
        } else if (wheel > 61) {
          if (!this.state.turning) {
            this.controller.send(
              JSON.stringify({ moving: "turn", turn_to: 15, settings: null })
            );
            this.setState({ turning: true });
          }
        } else if (wheel < 41) {
          if (!this.state.turning) {
            this.controller.send(
              JSON.stringify({ moving: "turn", turn_to: -15, settings: null })
            );
            this.setState({ turning: true });
          }
        } else if (wheel > 41 && wheel < 50) {
          if (this.state.turning) {
            this.controller.send(
              JSON.stringify({ moving: "s", settings: null })
            );
          }
          this.setState({ accelerate: false, turning: false });
        } else if (wheel > 51 && wheel < 61) {
          if (this.state.turning) {
            this.controller.send(
              JSON.stringify({ moving: "s", settings: null })
            );
          }
          this.setState({ accelerate: false, turning: false });
        } else if (cmd !== null) {
          this.controller.sned(
            JSON.stringify({ settings: "speed", value: cmd })
          );
        }
      }
    } catch (e) {}
  }

  updateSnackBar(msg) {
    this.setState({
      errMsg: msg
    });
  }

  createControlView() {
    if (this.state.connected) {
      return (
        <div className="row">
          <div className="col-lg-9 col-xl-9">
            <Display
              data={this.state.data}
              videosrc={this.state.videosrc}
              pointTo={this.state.pointTo}
            />
          </div>
          <div className="col-lg-3 col-xl-3">
            <GamepadComponent
              updateMsg={this.updateSnackBar.bind(this)}
              control={this.controlRobot.bind(this)}
              hit={this.state.hit}
            />
          </div>
        </div>
      );
    } else {
      return (
        <StepperInstruction
          errMsg={this.state.errMsg}
          steps={[
            "Check the hardware connection",
            "Check the docker-composer",
            "Refresh the page"
          ]}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <AppBar position="static" style={{ background: "#1E88E5" }}>
          <Toolbar>
            <div className="col-11">
              <h4>App</h4>
            </div>
            <div className="col-1">
              <SettingsIcon
                style={{ marginRight: 20 }}
                onClick={() => {
                  this.setState({ showSetting: true });
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Settings
          hidden={this.state.showSetting}
          open={this.state.showSetting}
          close={() => {
            this.setState({ showSetting: false });
          }}
        />
        <div className="container-fluid" style={{ marginTop: "10px" }}>
          {this.createControlView()}
          {/*<Input updateText={this.updateTextHandler.bind(this)} />*/}
        </div>
        <Snackbar
          open={this.state.errMsg !== ""}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          message={
            <span>
              <WarningIcon />
              {this.state.errMsg}
            </span>
          }
        />
      </div>
    );
  }
}

export default App;
