import React from "react";
const API_BASE = import.meta.env.VITE_API_BASE;
import {motion} from "framer-motion"

const BlogTile = ({
  title,
  image,
  genre,
  date_created,
  time_required,
  likes,
  comment_count,
}) => {
  return (
    <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} transition={{duration:0.4}}>
    <div className="box-border relative p-4 rounded-2xl overflow-hidden my-2 mx-2 transition-all duration-200 hover:-translate-y-3 hover:scale-101 hover:scale-y-103 active:scale-100">
      <div style={{backgroundImage: `url(${API_BASE + image})`, backgroundPosition:"center", backgroundRepeat:"no-repeat", backgroundSize:"cover"}} className="absolute brightness-50 hover:brightness-70 top-0 left-0 right-0 bottom-0 z-0 transition-all duration-300">
      </div>
      <div className="absolute pointer-events-none top-0 right-0 left-0 bottom-0 bg-radial from-transparent to-[#191919b1] z-0">
      </div>


        <div className="relative z-20 space-y-2 pointer-events-none">
          <div className="flex items-center justify-between">
          <p className="text-white font-bold text-xl">{title}</p>
          <p className="p-2 backdrop-blur-xs brightness-180 rounded-xl text-white">{genre}</p>
          </div>

          <div className=" text-neutral-400 flex gap-2 text-sm">
          <p>{date_created}</p>
          <p>&#8226;</p>
          <p>{time_required} min read</p>
          </div>
        </div>


      </div>
      </motion.div>
  );
};

export default BlogTile;
