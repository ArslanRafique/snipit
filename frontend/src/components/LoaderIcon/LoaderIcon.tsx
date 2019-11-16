import React from "react";
import loaderIcon from "../../static/images/loader_icon.png";
import "./LoaderIcon.scss";

import { useStore } from "../../store";

const LoaderIcon: React.FC = () => {

  const { autoSaving } = useStore();

  return (
    <div className="LoaderIcon">
      <img src={loaderIcon} alt="Loader icon" className={ autoSaving ? "loading" : ""}/>
    </div>
  );
};

export default LoaderIcon;
