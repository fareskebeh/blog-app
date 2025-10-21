import React from "react";

const Comment = ({ author, content, date_created }) => {
  return (
    <div className={`p-4 flex flex-col gap-2`}>
      <div className={`
        flex gap-2`}>
        <p className={` font-bold
            `}>{author}</p>
        <p>&#8226;</p>
        <p>{date_created}</p>
      </div>
      <p className="text-md">{content}</p>
    </div>
  );
};

export default Comment;
