import React from "react";
import AceEditor from "react-ace";
import SnippetType from "../../../../common/types/SnippetType";
import { useStore } from "../../store";
import { dateFormat } from "../../utils/dateFormat";
import AddSnippet from "../AddSnippet/AddSnippet";
import SnippetDescriptionBar from "../SnippetDescriptionBar/SnippetDescriptionBar";
import "./Editor.scss";

if( process.env.NODE_ENV !== "test") {
  require("ace-builds");
  require("ace-builds/src-noconflict/theme-monokai");
  require("ace-builds/src-noconflict/ext-language_tools");
  require("ace-builds/src-noconflict/ext-beautify");
  require("ace-builds/webpack-resolver");
}



const Editor: React.FC = () => {
  const { activeSnippet, changeActiveSnippet, updateActiveSnippet } = useStore();
  let timeOutId: any;

  if (!activeSnippet) {
    return (
      <div className="Editor empty">
        <div>Create your first snippet</div>
        <AddSnippet />
      </div>
    );
  }

  const changeCode = (newCode: string) => {

      const updatedSnippet: SnippetType = JSON.parse(
        JSON.stringify(activeSnippet)
      );

      const currentDate = new Date();
      updatedSnippet.content = newCode;
      updatedSnippet.date = currentDate
      updatedSnippet.dateSearch = dateFormat(currentDate);

      changeActiveSnippet(updatedSnippet);

      if(timeOutId) {
        clearTimeout(timeOutId);
      }
      
      timeOutId = setTimeout(() => {
        updateActiveSnippet(updatedSnippet);
      }, 100);
  };

  return (
    <div className="Editor">
      <SnippetDescriptionBar />
      <AceEditor
        mode="javascript"
        theme="monokai"
        onChange={changeCode}
        name="ACE_EDITOR_ID"
        height="100%"
        width="100%"
        editorProps={{ $blockScrolling: true }}
        value={(activeSnippet && activeSnippet.content) || ""}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
          }}
      />
    </div>
  );
};

export default Editor;
