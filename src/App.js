import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Content from "./Content";
import { MainContext } from "./Context/MainContext";
import Sidebar from "./Sidebar";

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <BrowserRouter>
      <Fragment>
        <MainContext.Provider value={{ showMenu, setShowMenu }}>
          <Sidebar />
          <Content />
        </MainContext.Provider>
      </Fragment>
    </BrowserRouter>
  );
};
export default App;
