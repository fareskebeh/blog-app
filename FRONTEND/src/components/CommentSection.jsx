import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import axiosInit from "../services/axios-init";
import { FaCheck, FaTimes } from "react-icons/fa";

const CommentSection = ({ theme, comments = [], id }) => {
  const [currCom, setCurrCom] = useState({
    author: "",
    content: "",
  });
  const [message, setMessage] = useState({
    shown: false,
    state: "",
  });

  const postComment = () => {
    if (currCom.author.trim() === "" || currCom.content.trim() === "") {
      return;
    } else {
      axiosInit
        .post(`post/${id}/comment`, currCom)
        .then((res) => {
          if (res) {
            setMessage({ shown: true, state: "success" });
          }
        })
        .catch((err) => {
          setMessage({
            shown: true,
            state: "error",
          });
        });
    }
  };

  useEffect(() => {
    if (message.shown === true) {
      setTimeout(() => {
        setMessage({ ...message, shown: false });
      }, 3000);
    }
  }, [message.shown]);

  return (
    <>
      <div
        className={`fixed flex gap-2 items-center p-2 rounded-2xl z-90 transition-all duration-300 pointer-events-none text-white 
          ${message.shown ? "bottom-4" : "-bottom-20"} 
          ${message.state === "success" ? "bg-green-600" : "bg-red-500"}
          `}
      >
        {message.state === "error" ? (
          <>
            <FaTimes /> Couldn't add comment, Try again later.
          </>
        ) : (
          <>
            <FaCheck /> Comment Added!
          </>
        )}
      </div>
      <div>
        <hr
          className={`mb-6 mt-2
              ${theme === "dark" ? "border-neutral-700" : "border-neutral-200"}
              `}
        />
        <p className="text-3xl font-bold">Comments ({comments.length})</p>
        <div className="">
          <div
            className={`commenter my-4 flex gap-2 **:outline-none **:shadow-md **:px-4 **:py-2 **:rounded-2xl **:resize-none
           `}
          >
            <input
              className={`
            ${theme === "dark" ? "bg-neutral-800" : "bg-neutral-100"}
            w-50`}
              type="text"
              placeholder="Your name.."
              onChange={(e) =>
                setCurrCom({ ...currCom, author: e.target.value })
              }
            />
            <textarea
              rows="1"
              className={`
                ${theme === "dark" ? "bg-neutral-800" : "bg-neutral-100"}
                `}
              type="text"
              placeholder="Add a comment.."
              onChange={(e) =>
                setCurrCom({ ...currCom, content: e.target.value })
              }
            />
            <button
              onClick={() => postComment()}
              className="py-2 px-4 bg-blue-500 rounded-4xl cursor-pointer hover:scale-102 active:scale-100 transition duration-300 text-white shadow-md "
            >
              Add
            </button>
          </div>
        </div>

        <div>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={comment.id}>
                <Comment
                  id={comment.id}
                  author={comment.author}
                  theme={theme}
                  date_created={comment.date_created}
                  content={comment.content}
                />
                {index !== comments.length - 1 && (
                  <hr
                    className={`${
                      theme === "dark"
                        ? "border-neutral-800"
                        : "border-neutral-200"
                    }`}
                  />
                )}
              </div>
            ))
          ) : (
            <div
              className={`
           
            p-8 flex justify-center`}
            >
              <div
                className={`p-8 rounded-xl text-center
                 ${theme === "dark" ? "bg-neutral-800" : "bg-neutral-100"}
                `}
              >
                <p className="text-3xl font-bold">No comments here</p>
                <p className="text-xl text-neutral-600 mt-2">
                  Be the first to comment
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentSection;
