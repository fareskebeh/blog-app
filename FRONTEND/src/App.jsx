import React, { useState, useEffect, useContext } from "react";
import Home from "./components/Home";
import themeContext from "./data/themeContext.js";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import BlogPreview from "./components/BlogPreview.jsx"
import { MdContrast } from "react-icons/md";

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
        className={`pt-18
        ${theme === "dark" ? "bg-zinc-900" : "bg-zinc-100"}
        pt-5 h-screen transition duration-300`}
      >
        <div className={`pointer-events-none bg-gradient-to-b px-2 py-6 z-60 ${
          theme==="dark" ? "from-black" : ""
        } to-transparent flex justify-end fixed top-0 left-0 right-0`}>
          <button
            onClick={() => {
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }}
            className={`pointer-events-auto
              mx-4 p-2 flex justify-center items-center shadow-md rounded-full ${
                theme==="dark" ? "bg-neutral-900" : "bg-white"
              } 
         cursor-pointer z-50
         ${theme === "dark" ? "fill-white" : ""}
         `}
          >
            <MdContrast size={25} color={theme==="dark" ? "white" : "black"}/>
          </button>
        </div>
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
