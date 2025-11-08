import { useState } from "react";
import Comment from "./Comment";
import axiosInit from "../services/axios-init";
import Message from "../reusables/Message";
import { FaRegPaperPlane } from "react-icons/fa";

const CommentSection = ({ comments = [], id }) => {
  const token = localStorage.getItem("token")
  const [currCom, setCurrCom] = useState({
    content: "",
  });
  const [response, setResponse] = useState({
    shown: false,
    message: "",
    status: undefined,
  });

  const postComment = () => {
    if (currCom.content.trim() === "") {
      return;
    } else {
      axiosInit
        .post(`post/${id}/comment`, currCom, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          if (res) {
            
            setResponse({ 
              message:"Comment Added!",
              shown: true,
              status: "success" });
          }
        })
        .catch((err) => {
          console.error(err)
          setResponse({
            message:"Could not add comment, Try again!",
            shown: true,
            status: "error",
          });
        });
    }
  };

  return (
    <>
      <div
        className={`flex **:transition duration-150 gap-2 items-center p-2 rounded-2xl transition pointer-events-none text-white `}
      >
        
      </div>
      <div>
        
        <p className="text-3xl font-bold dark:text-white">Comments ({comments.length})</p>
        <div className="relative">
          <div className={`h-30 my-4 **:transition duration-150`}>
            <textarea
              rows="1"
              className={`h-full pb-14 resize-none dark:bg-neutral-900 w-full bg-neutral-200 rounded-3xl p-4 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-600 outline-none`}
              type="text"
              placeholder="Add a comment.."
              onChange={(e) =>
                setCurrCom({ ...currCom, content: e.target.value })
              }
            />
            <div className="absolute rounded-bl-3xl rounded-br-3xl dark:bg-neutral-900 bg-neutral-200 bottom-0 left-0 right-0 p-2 flex justify-between items-center">
              <p className="ml-4 dark:text-neutral-700 text-neutral-500">{currCom.content.length}/500</p>
              
              <button
                onClick={() => postComment()}
                className="transition cursor-pointer hover:opacity-90 active:opacity-80 duration-150 p-2 dark:bg-white text-white dark:text-black bg-black rounded-full"
                >
                <FaRegPaperPlane size={20}/>
              </button>
            </div>
          </div>
        </div>

        <div>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={comment.id}>
                <Comment
                  avatar={comment.author.avatar}
                  id={comment.id}
                  by={comment.author.user}
                  date_created={comment.date_created}
                  content={comment.content}
                />
                {index !== comments.length - 1 && (
                  <hr
                    className={`dark:border-neutral-900 border-neutral-200`}
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
                className={`p-8 rounded-xl text-center *
                `}
              >
                <p className="text-3xl font-bold dark:text-white ">No comments here</p>
                <p className="text-xl text-neutral-600 dark:text-neutral-500 mt-2">
                  Be the first to comment
                </p>
              </div>
            </div>
          )}
        </div>
        {
          response.shown && <Message response={response} setResponse={setResponse}/>
        }
      </div>
    </>
  );
};

export default CommentSection;
