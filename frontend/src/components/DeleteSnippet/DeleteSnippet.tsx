import React from "react";

import "./DeleteSnippet.scss";
import delete_icon from "../../static/images/delete_icon.png";

import { useStore } from "../../store";

const DeleteSnippet: React.FC = () => {
    
    const { deleteActiveSnippet, activeSnippet } =  useStore();
  return (
    <div className="DeleteSnippet" onClick={ () => { activeSnippet && deleteActiveSnippet() }}>
      <img src={delete_icon} className={activeSnippet ? "": "not-active" } alt="delete"/>
    </div>
  );
};

export default DeleteSnippet;