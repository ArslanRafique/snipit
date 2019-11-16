import React from "react";
import "./AddSnippet.scss";
import add_icon from "../../static/images/add_icon.png";
import SnippetType from "../../../../common/types/SnippetType";

import uuid from "uuid/v4";

import { useStore } from "../../store";
import { dateFormat } from "../../utils/dateFormat";

const AddSnippet: React.FC = () => {
  const { createSnippet } = useStore();
  const addNewSnippet = async () => {
    let date = new Date();

    const snippet: SnippetType = {
      uuid: uuid(),
      editorMode: "javascript",
      description: "New Snippet",
      date: date,
      dateSearch: dateFormat(date),
      content: ""
    };
    createSnippet(snippet);
  };

  return (
    <div className="AddSnippet" onClick={addNewSnippet}>
      <img src={add_icon} alt="add"/>
    </div>
  );
};

export default AddSnippet;
