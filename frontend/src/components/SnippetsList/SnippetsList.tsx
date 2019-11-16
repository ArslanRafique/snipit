import React from "react";
import Snippet from "../Snippet/Snippet";
import { useStore } from "../../store";

import "./SnippetsList.scss";

const SnippetsList: React.FC = () => {

  const { snippets } = useStore();

  return (
    <div className="SnippetsList" key="SnippetsList">
      { snippets && snippets.map ((snippet) => <Snippet key={snippet.uuid} snippet={snippet} />) }
    </div>
  );
};

export default SnippetsList;