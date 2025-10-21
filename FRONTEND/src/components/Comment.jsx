import React from "react";

const Comment = ({ author, content, date_created }) => {
  return (
    <div className={`p-4 flex flex-col gap-4`}>
      <div className={`
        flex gap-2`}>
        <p className={`dark:text-white font-bold 
            `}>{author}</p>
        <p className="text-neutral-600 dark:text-neutral-500">&#8226;</p>
        <p className="text-neutral-600 dark:text-neutral-500">{date_created}</p>
      </div>
      <p className="text-md dark:text-neutral-400">{content}</p>
    </div>
  );
};

export default Comment;
