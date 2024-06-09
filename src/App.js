import React from "react";
import Main from "./page/main";
import Finish from "./page/finish";
import Header from "./component/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/finish" element={<Finish />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
