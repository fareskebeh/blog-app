import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosInit from "../services/axios-init";
import CommentSection from "./CommentSection";
import { MdShare } from "react-icons/md";
import { FaHeart, FaCheck, FaTimes } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import copy from "copy-to-clipboard";
const API_BASE = import.meta.env.VITE_API_BASE;
import {AnimatePresence, motion} from "framer-motion"

const BlogPreview = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [open, setOpen] = useState({
    copyLink: false,
    copiedMessage: false,
  });
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    axiosInit
      .get(`post/${id}`)
      .then((res) => {
        if (res) {
          setPost(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const copyToclip = (link) => {
    copy(link);
    setOpen({ ...open, copiedMessage: true });
  };

  useEffect(() => {
    setTimeout(() => {
      setOpen({ ...open, copiedMessage: false });
    }, 2000);
  }, [open.copiedMessage]);

  const formatBody = (paragraph = "") => {
    const subPars = paragraph
      .split(".")
      .filter((subPar) => subPar.trim() !== "");
    return subPars.map((subPar, index) => (
      <p
        key={index}
        className={`mb-4 text-xl`}
      >
        {subPar.trim()}.
      </p>
    ));
  };

  return (
    <div
      className={`p-4 transition duration-300
        `}
    >
      <header>
        <p className={`font-bold text-5xl mb-2 transition duration-150 dark:text-white`}>{post.title} </p>
        <div
          className={`**:text-xl flex dark:text-neutral-500 text-neutral-700 flex-col gap-2
                **:italic pl-2 mb-4`}
        >
          <p>By: Fares Kebbeh &#8226; {post.time_required} min read</p>
          <p>At: {post.date_created}</p>
        </div>
      </header>

      <div className="relative mb-8">
        <img
          className="w-[100%] h-80 object-cover overflow-hidden rounded-4xl"
          src={API_BASE + post.image}
          alt=""
        />
      </div>

      <div>
        <p className="dark:text-white transition duration-150">{formatBody(post.body)}</p>
        <div className="flex items-center gap-2 p-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLiked(!liked)}
              className="**:fill-neutral-400 cursor-pointer "
            >
              <FaHeart
                className={`transition duration-300 hover:scale-105 active:scale-110 ${
                  liked ? "fill-rose-700" : ""
                }`}
                size={28}
              />
            </button>
            <p className="text-neutral-500 text-xl">{post.likes}</p>
          </div>
          <p
            className={`
            `}
          >
          </p>
          <div className="relative flex items-center">
            <button
              onFocus={() => setOpen({ ...open, copyLink: true })}
              onClick={()=>setOpen({...open, copyLink: !open.copyLink})}
              className="hover:scale-107 active:scale-100 transition duration-300 cursor-pointer text-neutral-400"
            >
              {open.copyLink ? <FaTimes size={28} /> : <MdShare size={28} />}
            </button>

            <AnimatePresence>
            { open.copyLink &&
              <motion.div
              initial={{opacity:0, y:-20}}
              animate={{opacity:1, y:0}}
              exit={{opacity:0, y:-20}}
              transition={{duration:0.2}}
              className={`transition-colors dark:bg-neutral-900 bg-white duration-150 overflow-hidden
              shadow-md rounded-2xl text-nowrap absolute flex gap-2 -bottom-20 p-4`}
            >
              <p className={`copy dark:text-neutral-500 border-2 p-2 rounded-xl border-neutral-300 dark:border-neutral-800`}>
                {window.location.href}
              </p>
              <button
                onClick={() => {
                  copyToclip(window.location.href);
                }}
                className={`${
                  open.copiedMessage ? "bg-green-500" : ""
                } bg-blue-500 *:fill-white py-2 rounded-xl px-3 cursor-pointer shadow-sm hover:scale-102 active:scale-100 transition duration-300`}
              >
                {open.copiedMessage ? <FaCheck size={23}/> : <AiOutlineLink size={23}/>}
              </button>
            </motion.div>}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <CommentSection id={id} comments={post.comments} />
    </div>
  );
};

export default BlogPreview;
