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
    setResponse({
      shown: true,
      message: "Please Wait...",
      status: "loading"
    })
    if (currCom.content.trim() === "" || currCom.content.trim().length > 500) {
      setResponse({
        shown: false,
        message: "",
        status: "error"
      })
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
      <div className="flex flex-col gap-4 md:h-80 md:flex-row md:*:flex-1 md:gap-8">

        <div className="overflow-y-hidden flex flex-col gap-4">
        
          <p className="text-3xl transition duration-150 font-bold dark:text-white">Comments ({comments.length})</p>
          
          <div className={`flex flex-1 flex-col`}>
            <textarea
              className={`pb-14 flex-1 md:h-full resize-none dark:bg-neutral-900 w-full bg-neutral-200 rounded-tr-3xl rounded-tl-3xl p-4 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-600 outline-none transition duration-150`}
              type="text"
              placeholder="Add a comment.."
              onChange={(e) =>
                setCurrCom({ ...currCom, content: e.target.value })
              }
            />
            <div className="transition duration-150 rounded-bl-3xl rounded-br-3xl dark:bg-neutral-900 bg-neutral-200 bottom-0 left-0 right-0 p-2 flex justify-between items-center">
              <p className="ml-4 dark:text-neutral-700 text-neutral-500">{currCom.content.length}/500</p>
              
              <button
                onClick={() => postComment()}
                className={`transition ${!currCom?.content.trim() || response.status==="loading" || currCom?.content.trim().length > 500 ? "dark:opacity-60 opacity-20 cursor-not-allowed" : "hover:opacity-90 active:opacity-80 cursor-pointer"} duration-150 p-2 dark:bg-white text-white dark:text-black bg-black rounded-full`}
                >
                <FaRegPaperPlane size={20}/>
              </button>
            </div>
          </div>
        </div>

        <div className="h-full overflow-y-auto md:border dark:border-neutral-800 border-neutral-300 md:shadow-md md:bg-neutral-200 md:dark:bg-neutral-900  px-4 rounded-xl">
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
                    className={`md:dark:border-neutral-800 dark:border-neutral-900 transition duration-150 md:border-neutral-300 border-neutral-200`}
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