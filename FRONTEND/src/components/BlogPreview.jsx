import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInit from "../services/axios-init";
import CommentSection from "./CommentSection";
import { FaHeart, FaBookmark } from "react-icons/fa";
import Markdown from "react-markdown";
import Message from "../reusables/Message";
import { useSavedPosts } from "../hooks/useSavedPosts";
import AuthModal from "../reusables/AuthModal";
import { AnimatePresence } from "framer-motion";

const BlogPreview = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const[modal,setModal] = useState(false)
  const [post, setPost] = useState({});
  const [response, setResponse] = useState({
    shown: false,
    message: "",
    status: undefined,
  });
  const [liked, setLiked] = useState(false);


  const savedPosts = useSavedPosts();
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    if(token) {
      if (savedPosts && savedPosts.length > 0) {
        const match = savedPosts.some((post) => post.id === id);
        setIsSaved(match);
      }
    }
  }, [savedPosts, id]);

  useEffect(()=> {
    setLikeCount(post?.likes?.length ?? 0)
  },[post])

  useEffect(()=> {
    if(token) {
      setLiked(post?.liked)
    }
  },[post.liked, id])

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    axiosInit
      .get(`post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res) {
          setPost(res.data.data);
        }
      })
      .catch((err) => {
        console.error(err)
      });
  }, [id]);

  useEffect(()=> {
    if(modal) {
      document.body.style.overflowY = "hidden"
    }
    else {
      document.body.style.overflowY = "auto"
    }
  },[modal])

  const saveOrUnsave = (action) => {
    if(!token) {
      setModal(true)
      return
    }
    setResponse({
      status: "loading",
      message: "Please Wait..",
      shown: true,
    });
    axiosInit
      .post(
        action === "save" ? "save" : "unsave",
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setResponse({
          shown: true,
          message: action === "save" ? "Post Saved!" : "Post Unsaved!",
          status: "success",
        });
        setIsSaved(!isSaved)
      })
      .catch(() => {
        setResponse({
          shown: true,
          message:
            action === "save"
              ? "Could not save post, try again!"
              : "Could not unsave post, try again!",
          status: "error",
        });
      });
  };

  const likeOrUnlike = (action) => {
  if (!token) {
    setModal(true);
    return;
  }
  
  setResponse({
    status: "loading",
    message: "Please Wait..",
    shown: true,
  });
  
  setLiked(action === "like");
  
  axiosInit
    .post(
      "like",
      { id: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(() => {
      setResponse({
        shown: true,
        message: action === "like" ? "Post Liked!" : "Post Unliked!",
        status: "success",
      });
      setLikeCount(prev=> {
        return action==="like" ? prev +1 : prev -1;
      })
    })
    .catch(() => {
      setLiked(liked);
            
      setResponse({
        shown: true,
        message: action === "like" 
          ? "Could not like post, try again!"
          : "Could not unlike post, try again!",
        status: "error",
      });
    });
};

  return (
    <div
      className={`p-4 pt-24 transition-colors duration-300
        `}
    >
      <header>
        <p
          className={`font-bold text-5xl mb-2 transition-colors duration-150 dark:text-white`}
        >
          {post.title}{" "}
        </p>
        <div
          className={`**:text-xl flex dark:text-neutral-500 text-neutral-700 flex-col gap-2
                **:italic pl-2 mb-4`}
        >
          <p>By: Fares Kebbeh &#8226; {post.time_required} min read</p>
          <p>At: {post.date_created}</p>
        </div>
      </header>

      <div className="relative mb-8">
        { post.image?
          <img
            className="w-full h-80 object-cover overflow-hidden rounded-4xl"
            src={post.image}
            alt=""
          />
          :
          <div className="w-full bg-neutral-200 dark:bg-neutral-900 animate-pulse h-80 overflow-hidden rounded-4xl">
            
          </div>
        }
      </div>

      <div>
        <div className="py-4 text-lg prose dark:[&>hr]:border-neutral-900 *:transition-colors duration-150 dark:prose-invert">
          <Markdown>{post.body}</Markdown>
        </div>
        <div className="flex mb-4 items-center gap-2 p-2">
          <div className="flex  items-center gap-2">
            <button
              onClick={()=> likeOrUnlike(liked?"unlike":"like")}
              className=" cursor-pointer "
            >
              <FaHeart className={` transition-all duration-150 hover:scale-105 active:scale-110 ${liked ? "text-rose-400" : "text-neutral-400"}`}size={28}/>
            </button>
            <p className={`${liked ? "text-rose-400" : "text-neutral-400"} transition duration-150 text-xl`}>{likeCount}</p>
          </div>
          <p
            className={`
            `}
          ></p>

          <button
            onClick={() => saveOrUnsave(isSaved ? "unsave" : "save")}
            className={`transition-colors duration-150 ${
              isSaved ? "text-amber-400" : "text-neutral-400"
            } cursor-pointer`}
          >
            <FaBookmark size={28} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        { modal&&       
          <AuthModal modal={modal} setModal={setModal}/>
        }
      </AnimatePresence>
      <Message response={response} setResponse={setResponse} />

      <CommentSection id={id} comments={post.comments} />
    </div>
  );
};

export default BlogPreview;
