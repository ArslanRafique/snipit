import React from "react";

import "./ControlsBar.scss";
import AddSnippet from "../AddSnippet/AddSnippet";
import DeleteSnippet from "../DeleteSnippet/DeleteSnippet";
import Search from "../Search/Search";

const ControlsBar: React.FC = () => {
  return (
    <div className="ControlsBar">
      <div className="LeftContainer">
          <Search />
      </div>
      <div className="RightContainer">
          <DeleteSnippet />
          <AddSnippet />
      </div>
    </div>
  );
};

export default ControlsBar;
