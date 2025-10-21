import React, { useState, useEffect, useContext } from "react";
import Home from "./components/Home";
import themeContext from "./data/themeContext.js";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import BlogPreview from "./components/BlogPreview.jsx"
import Nav from "./components/navigation/Nav.jsx";

const App = () => {

  return (
    <Router>
      <div>
        <Nav/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/post/:id" element={<BlogPreview/>} />
      </Routes>
      </div>
    </Router>

  );
};

export default App;
