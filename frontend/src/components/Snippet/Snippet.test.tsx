import React from "react";
import ReactDOM from "react-dom";
import Snippet from "./Snippet";
import SnippetType from "../../../../common/types/SnippetType";
import { dateFormat } from "../../utils/dateFormat";

it("renders without crashing", () => {
    const snippetCreationDate = new Date();
  let snippet: SnippetType = {
    uuid: "abc-123",
    editorMode: "javascript",
    date: snippetCreationDate,
    dateSearch: dateFormat(snippetCreationDate),
    description: "TestSnippet",
    content: "function testing(){console.log('testing');}"
  };
  const div = document.createElement("div");
  ReactDOM.render(<Snippet snippet={snippet}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
