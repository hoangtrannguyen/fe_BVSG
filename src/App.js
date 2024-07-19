import React from "react";
import { Routes, BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Setting from "./pages/Setting/Setting.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/About" exact element={<About />}></Route>
          <Route path="/Setting" exact element={<Setting />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
