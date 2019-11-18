import React from 'react';
import { hot } from "react-hot-loader/root";
import Home from "./Home/Home";
import './App.scss';
import { StoreProvider } from "../store";

import 'ace-builds';
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import 'ace-builds/webpack-resolver';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <div className="App">
        <Home />
      </div>
    </StoreProvider>
  );
}

export default hot(App);

