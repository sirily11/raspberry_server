import React, { Component } from "react";
import Display from "./components/display";
import Input from "./components/input";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.ws = new WebSocket("ws://" + document.domain + ":5000/update");
    this.ws.onmessage = event => {
      this.setState({ data: JSON.parse(event.data) });
    };
  }
  render() {
    return (
      <div className="">
        <Input />
        <Display data={this.state.data} />
      </div>
    );
  }
}

export default App;
