import React, { Component } from "react";
import { MDCTextField } from "@material/textfield";

export default class Input extends Component {
  componentDidMount() {
    const helperText = new MDCTextField(
      document.querySelector(".mdc-text-field")
    );
  }

  enterHandler(e) {
    if (e.key === "Enter") {
      let userInput = e.target.value;
      //this.props.updateList(userInput);
      e.target.value = "";
    }
  }

  render() {
    return (
      <div className="mdc-text-field mdc-text-field--fullwidth">
        <input
          type="text"
          id="my-text-field"
          onKeyDown={this.enterHandler.bind(this)}
          className="mdc-text-field__input"
        />
        <label className="mdc-floating-label" htmlFor="my-text-field">
          Text to show
        </label>
        <div className="mdc-line-ripple" />
      </div>
    );
  }
}
