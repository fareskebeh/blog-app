import React, { useState, useEffect, useContext } from "react";
import Home from "./components/Home";
import themeContext from "./data/themeContext.js";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import BlogPreview from "./components/BlogPreview.jsx"
import Nav from "./components/navigation/Nav.jsx";

const App = () => {

  const [theme, setTheme] = useState("dark");

 
  useEffect(() => {
    const userTheme = window.localStorage.getItem("theme");
    setTheme(userTheme)
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>

    <Router>
     
      <div
        className={`${theme === "dark" ? "bg-zinc-900" : "bg-zinc-100"} transition duration-300`}
      >
        <Nav theme={theme} setTheme={setTheme}/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/post/:id" element={<BlogPreview/>} />
      </Routes>
      </div>
    </Router>
    </themeContext.Provider>

  );
};

export default App;
