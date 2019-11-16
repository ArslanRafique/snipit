import React, { useState } from "react";

import "./Search.scss";
import cancel from "../../static/images/cancel.png";

import { useStore } from "../../store";

const Search: React.FC = () => {
  const { searchSnippet } = useStore();
  const [searchString, setSearchString] = useState("");

  return (
    <div className="Search">
      <div className="SearchContainer">
        <input
          value={searchString}
          placeholder="Search snippet"
          onChange={event => {
            searchSnippet(event.target.value);
            setSearchString(event.target.value);
          }}
        />
        {searchString !== "" ? (
          <img
            src={cancel}
            alt="cancel"
            onClick={() => {
              searchSnippet("");
              setSearchString("");
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Search;
