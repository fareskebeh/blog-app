import { useState } from "react";
import Comment from "./Comment";
import axiosInit from "../services/axios-init";
import Message from "../reusables/Message";

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
        className={`flex gap-2 items-center p-2 rounded-2xl transition-all duration-300 pointer-events-none text-white `}
      >
        
      </div>
      <div>
        
        <p className="text-3xl font-bold dark:text-white transition duration-150">Comments ({comments.length})</p>
        <div className="">
          <div
            className={`commenter my-4 flex gap-2 **:outline-none **:shadow-md **:px-4 **:py-2 **:rounded-2xl **:resize-none
           `}
          >
            
            <textarea
              rows="1"
              className={`dark:bg-neutral-900 transition duration-150 bg-neutral-200 dark:placeholder-neutral-600 placeholder-neutral-500 caret-blue-500 dark:text-white    
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
                className={`p-8 rounded-xl text-center *:transition duration-150
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
