import React, { Component } from "react";
import Slider, { Range } from "rc-slider";
import { Dialog, DialogContent } from "@material-ui/core";
import "rc-slider/assets/index.css";
// import Slider from "@material-ui/lab/Slider";

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      speed: 0,
      control: 0
    };
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => {
            this.props.close();
          }}
          className="settings"
          fullWidth={true}
        >
          <DialogContent>
            <h4>Settings</h4>
            <span>Speed: {this.state.speed}</span>
            <Slider
              min={0}
              max={400}
              step={50}
              className="slider"
              value={this.state.speed}
              onChange={v => {
                this.setState({ speed: v });
                
              }}
            />
            <span>Control sensitive: {this.state.control}</span>
            <Slider
              min={0}
              max={100}
              className="slider"
              value={this.state.control}
              onChange={v => {
                this.setState({ control: v });
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
