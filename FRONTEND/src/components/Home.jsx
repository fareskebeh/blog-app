import { OtherBlogs } from "./OtherBlogs";
import React, { useState, useEffect } from "react";
import axiosInit from "../services/axios-init.js";
import { motion as Motion } from "framer-motion";
import LatestBlogs from "./LatestBlogs.jsx";
import LatestCarousel from "./LatestCarousel.jsx";
import Error from "../fallback/Error";
import Loading from "../fallback/Loading";

const Home = () => {

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
        }
        
      }).catch(()=> {
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

  return (
    <div
      className={`pt-20 transition duration-150
    `}
    >
      <Motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className={`px-4 text-4xl dark:text-white font-bold`}>Welcome to my blog</p>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className={`px-6 my-4 text-xl dark:text-neutral-400 text-neutral-700`}>
          Here are my latest posts
        </p>
      </Motion.div>

      { 
      loading ? <Loading/> :
      posts.length!==0 ?
      view === "desktop" ?
        <LatestBlogs posts={posts}/>
        : 
        <LatestCarousel posts={posts}/> : <Error message={404}/>
      }

      <OtherBlogs/>
    </div>
  );
};

export default Home;
