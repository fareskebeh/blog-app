import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LatestCard from "./LatestCard";
import {Link} from "react-router-dom"


const LatestBlogs = ({ theme , posts}) => {
   return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div
        className={`flex justify-around gap-8 p-8
        ${theme === "dark" ? "bg-neutral-900" : "bg-neutral-100"}`}
      >
        {
          posts.map((post,index)=> {
            return (
            <Link className="contents" to={`post/${post.id}`}  key={index}>
              <LatestCard id={post.id} date_created={post.date_created} time_required={post.time_required} title={post.title} genre={post.genre} image={post.image}/>
            </Link>
            );
          })
        }
      </div>
    </motion.div>
  );
};

export default LatestBlogs;
