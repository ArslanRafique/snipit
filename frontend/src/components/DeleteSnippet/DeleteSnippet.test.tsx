import React from "react";
import ReactDOM from "react-dom";
import DeleteSnippet from "./DeleteSnippet";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DeleteSnippet />, div);
  ReactDOM.unmountComponentAtNode(div);
});
