import React from "react";

const Comment = ({ by, avatar, content, date_created }) => {
  return (
    <div className="flex gap-2 py-4 items-center">
      <img className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full border shadow-sm dark:border-neutral-700" src={import.meta.env.VITE_API_BASE+avatar}/> 
      <div className={`p-2 flex flex-col gap-2`}>
        <div className={`
          flex gap-2`}>
          <p className={`dark:text-white font-bold 
              `}>@{by}</p>
          <p className="text-neutral-600 dark:text-neutral-500">&#8226;</p>
          <p className="text-neutral-600 dark:text-neutral-500">{date_created}</p>
        </div>
        <p className="text-md dark:text-neutral-400">{content}</p>
      </div>
    </div>
  );
};

export default Comment;