import React, { Component } from "react";
import { Card, Stepper, StepLabel, Step } from "@material-ui/core";

export default class StepperInstruction extends Component {
  renderSteps() {
    return this.props.steps.map(step => {
      return (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      );
    });
  }
  render() {
    return (
      <div>
        <Card>
          <div style={{ marginLeft: "20px" }}>
            <h4>Something went wrong</h4>
            <span>{this.props.errMsg}</span>
          </div>
          <Stepper>{this.renderSteps()}</Stepper>
        </Card>
      </div>
    );
  }
}
