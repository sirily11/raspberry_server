import React, { Component } from "react";
import Display from "./components/display";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          name: "Temperture",
          data: "33"
        },
        {
          name: "Pressure",
          data: "300"
        }
      ]
    };
  }
  render() {
    return (
      <div className="">
        <Display data={this.state.data} />
      </div>
    );
  }
}

export default App;
