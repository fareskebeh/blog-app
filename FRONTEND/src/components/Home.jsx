import { OtherBlogs } from "./OtherBlogs";
import React, { useState, useContext, useEffect } from "react";
import axiosInit from "../services/axios-init.js";
import themeContext from "../data/themeContext.js";
import { motion } from "framer-motion";
import LatestBlogs from "./LatestBlogs.jsx";
import LatestCarousel from "./LatestCarousel.jsx";
import Error from "../fallback/Error";
import Loading from "../fallback/Loading";

const Home = () => {

   const [error, setError] = useState(false);
      const [loading, setLoading] = useState(true);
    
  const[posts,setPosts] = useState([])
  const [view, setView] = useState(
    window.innerWidth > 480 ? "desktop" : "mobile"
  );

  useEffect(() => {
      setLoading(true)
      axiosInit.get("latest")
      .then((res)=> {
        if(res) {
          setPosts(res.data.data)
          setLoading(false)
          setError(false)
        }
        
      }).catch((err)=> {
        setError(true)
        console.error(err)
      })
    }, []);
  

  useEffect(() => {
    const adaptView = ()=> {
      if(window.innerWidth > 840) {
        setView("desktop")
      }
      else {
        setView("mobile")
      }
    }

    adaptView();

    window.addEventListener("resize",adaptView)

    return () => {
      window.removeEventListener("resize",adaptView)
    }
  }, []);

  const { theme } = useContext(themeContext);
  return (
    <div
      className={` transition-all duration-300
    ${theme === "dark" ? " **:text-white bg-neutral-900" : ""}
    `}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className={`px-4 text-4xl font-bold`}>Welcome to my blog</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className={`px-6 my-4 text-2xl font-extralight`}>
          Here are my latest posts
        </p>
      </motion.div>

      { 
      loading ? <Loading/> :
      posts.length!==0 ?
      view === "desktop" ?
        <LatestBlogs theme={theme} posts={posts}/>
        : 
        <LatestCarousel theme={theme} posts={posts}/> : <Error message={404}/>
      }

      <OtherBlogs theme={theme} />
    </div>
  );
};

export default Home;
