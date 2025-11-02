import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInit from "../services/axios-init";
import CommentSection from "./CommentSection";
import { MdShare } from "react-icons/md";
import { FaHeart, FaCheck, FaTimes, FaBookmark } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import copy from "copy-to-clipboard";
const API_BASE = import.meta.env.VITE_API_BASE;
import {AnimatePresence, motion} from "framer-motion"
import Markdown from "react-markdown"
import Message from "../reusables/Message";

const BlogPreview = () => {
  const token = localStorage.getItem('token')
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [open, setOpen] = useState({
    copyLink: false,
    copiedMessage: false,
  });
  const [liked, setLiked] = useState(false);
  const[response,setResponse] = useState({
    shown: false,
    message:"",
    status: undefined,
  })


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

  const savePost=()=> {
    axiosInit.post(`${import.meta.env.VITE_API_BASE}save`,
      {
        id:id 
      }, 
      {
      headers: {
        'Authorization':`Bearer ${token}`
      }
    }).then(res=> {
      setResponse({
        shown: true,
        message:"Post saved!",
        status: "success"
      })
    }).catch(err=> {
      setResponse({
        shown: true,
        message:"Could not save post, try again!",
        status: "error"
      })
    })
  }

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
          className="w-full h-80 object-cover overflow-hidden rounded-4xl"
          src={API_BASE + post.image}
          alt=""
        />
      </div>

      <div>
        <div className="py-4 text-lg prose dark:[&>hr]:border-neutral-900 *:transition duration-150 dark:prose-invert">
        <Markdown>
          {post.body}
        </Markdown>
        </div>
        <div className="flex mb-4 items-center gap-2 p-2">
          <div className="flex  items-center gap-2">
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

          <button onClick={savePost} className="ml-2 cursor-pointer text-neutral-400">
            <FaBookmark size={28}/>
          </button>
        </div>
      </div>

      <Message status={response.status} shown={response.shown} message={response.message} />

      <CommentSection id={id} comments={post.comments} />
    </div>
  );
};

export default BlogPreview;
