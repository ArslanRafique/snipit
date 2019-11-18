import React from "react";
import ReactDOM from "react-dom";
import ControlsBar from "./ControlsBar";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ControlsBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
