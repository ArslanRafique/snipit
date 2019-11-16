import React from "react";
import "./SnippetDescriptionBar.scss";
import LoaderIcon from "../LoaderIcon/LoaderIcon";

import { useStore } from "../../store";
import SnippetType from "../../../../common/types/SnippetType";

const SnippetDescriptionBar: React.FC = () => {
  const {
    changeActiveSnippet,
    activeSnippet,
    updateActiveSnippet
  } = useStore();
  let timeOutId: any;

  const changeDescription = (newDescription: string) => {
    if (!activeSnippet) {
      return;
    }

    const updatedSnippet: SnippetType = JSON.parse(
      JSON.stringify(activeSnippet)
    );

    updatedSnippet.description = newDescription;
    changeActiveSnippet(updatedSnippet);

    if (timeOutId) {
      clearTimeout(timeOutId);
    }

    timeOutId = setTimeout(() => {
      updateActiveSnippet(updatedSnippet);
    }, 3000);
  };

  return (
    <div className="SnippetDescription">
      <div className="DescriptionInput">
        <input
          placeholder="Snippet description..."
          value={(activeSnippet && activeSnippet.description) || ""} // eslint-disable-line no-mixed-operators
          onChange={event => {
            changeDescription(event.target.value);
          }}
        />
      </div>
      <div className="Loader">
        <LoaderIcon />
      </div>
    </div>
  );
};

export default SnippetDescriptionBar;
