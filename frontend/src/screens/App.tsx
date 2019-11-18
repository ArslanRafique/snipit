import React from 'react';
import { hot } from "react-hot-loader/root";
import Home from "./Home/Home";
import './App.scss';
import { StoreProvider } from "../store";

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

