import React, { useState, useEffect } from "react";
const API_BASE = import.meta.env.VITE_API_BASE;
import {
  FaArrowLeft,
  FaArrowRight,
  FaCircle,
  FaRegCircle,
} from "react-icons/fa";
import {motion} from "framer-motion"
import {Link} from "react-router-dom"
import {useSwipeable} from "react-swipeable"

const LatestCarousel = ({ theme, posts = [] }) => {
  const [page, setPage] = useState(0);
 const gestures = useSwipeable({
  onSwipedRight: ()=> traverse("left"),
  onSwipedLeft: ()=> traverse("right")
 })

  const traverse = (direction) => {
    setPage((prevPage) => {
      if (direction === "right") {
        if (prevPage >= posts.length - 1) {
          return prevPage;
        } else {
          return prevPage + 1;
        }
      } else {
        if (prevPage <= 0) {
          return prevPage;
        } else {
          return prevPage - 1;
        }
      }
    });
  };

  return (
      <div>
      <Link to={`post/${posts[page].id}`} className="box-border p-4">


        <motion.div {...gestures} key={page} initial={{opacity:0}} whileInView={{opacity:1}} animate={{opacity:1}} transition={{duration:0.8}}>
        <div className={ `transition-all duration-300 shadow-lg relative h-90 m-4 rounded-3xl overflow-hidden`}>

            <img className="flex-1 w-full h-full object-cover" src={API_BASE + posts[page].image} alt="" />
          
          <div className="absolute top-0 bottom-0 right-0 left-0 bg-radial from-transparent to-black"></div>
          <div className="p-2 absolute flex flex-col gap-2 bottom-4 left-4">
          
          <div>
        <p
          className={`shadow-sm p-2 rounded-md inline-block
        ${theme === "dark" ? "bg-neutral-700" : "bg-neutral-100"}
        `}
        >
          {posts[page].genre}
        </p>
          </div>

            <p className="font-bold text-2xl text-white">{posts[page].title}</p>

            <div className="flex gap-2 text-neutral-300" >
            <p>{posts[page].date_created}</p>
            <p>&#8226;</p>
            <p>{posts[page].time_required} mins read</p>
            </div>
          </div>
        </div>
        </motion.div>
        </Link>





      <div className="flex items-center justify-around gap-2">
        
        <button onClick={() => traverse("left")} className={`**:fill-black ${page===0 && "opacity-0  pointer-events-none"} transition-all duration-300 hover:-translate-x-1 active:-translate-x-2 cursor-pointer bg-neutral-200 p-2 rounded-full`}>
          <FaArrowLeft />
        </button>

        <div className="flex gap-3">
          {page===0 ?  <FaCircle size={8}/> : <FaRegCircle size={8}/>}
          {page===1 ?  <FaCircle size={8}/> : <FaRegCircle size={8}/>}
          {page===2 ?  <FaCircle size={8}/> : <FaRegCircle size={8}/>}
        </div>
        <button
          onClick={() => traverse("right")}
          className={`
            ${
              page>=posts.length-1 && "opacity-0 pointer-events-none"
            }
            transition-all duration-300 hover:translate-x-1 active:translate-x-2 cursor-pointer bg-neutral-200 p-2 **:fill-black rounded-full`}
        >
          <FaArrowRight />
        </button>
      </div>
      </div>
  );
};

export default LatestCarousel;
