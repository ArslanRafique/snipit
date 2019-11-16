import React from "react";
import SnippetType from "../../../../common/types/SnippetType";
import "./Snippet.scss";
import { useStore } from "../../store";
import { dateFormat } from "../../utils/dateFormat";

interface SnippetProps {
  snippet: SnippetType;
}

const Snippet: React.FC<SnippetProps> = props => {
  const { changeActiveSnippet, activeSnippet } = useStore();
  let localSnippet: SnippetType;
  if ( activeSnippet && activeSnippet.uuid === props.snippet.uuid ) {
    localSnippet = activeSnippet;
  } else {
    localSnippet = props.snippet
  }

  return (
    <div
      className={
        "Snippet " + ( activeSnippet === localSnippet
          ? "activeSnippet"
          : " " )
      }
      onClick={() => {
        changeActiveSnippet(localSnippet);
      }}
    >
      <div className="Description">{localSnippet.description}</div>
      <div className="DateModified">{dateFormat(localSnippet.date)}</div>
    </div>
  );
};

export default Snippet;
