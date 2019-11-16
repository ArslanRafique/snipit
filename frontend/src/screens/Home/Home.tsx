import React from "react";
import "./Home.scss";
import SnippetsList from "../../components/SnippetsList/SnippetsList";
import Editor from "../../components/Editor/Editor";
import ControlsBar from "../../components/ControlsBar/ControlsBar";

import { useStore } from "../../store";

const Home: React.FC = () => {
  const { activeSnippet } = useStore();
  return (
    <div className="Home">
        <div className="Navigation">
          <ControlsBar />
          <SnippetsList />
        </div>

      <div className="EditorContainer">
        <Editor />
      </div>
    </div>
  );
};

export default Home;
