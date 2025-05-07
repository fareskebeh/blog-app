import React from "react";

const Comment = ({ theme, author, content, date_created }) => {
  return (
    <div className={`p-4 flex flex-col gap-2`}>
      <div className={`
        ${
            theme==="dark" ? "text-neutral-500" : "text-neutral-500"
        }
        flex gap-2`}>
        <p className={` font-bold
            ${theme==="dark" ? "text-white" : "text-black"}
            `}>{author}</p>
        <p>&#8226;</p>
        <p>{date_created}</p>
      </div>
      <p className="text-md">{content}</p>
    </div>
  );
};

export default Comment;
