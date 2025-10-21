import React, { useContext } from "react";
import Img from "../assets/img/placeholder.png";
const API_BASE = import.meta.env.VITE_API_BASE;


const LatestCard = ({date_created, genre, id, image, time_required, title}) => {
  return (
    <div
      className={`
    flex flex-col bg-white dark:bg-neutral-900 border-b-4 border-b-neutral-300 dark:border-b-neutral-800 transition duration-150 justify-around gap-2 box-border flex-1 shadow-lg p-6 rounded-4xl  cursor-pointer hover:-translate-y-1 active:-translate-y-2`}
    >
      
      <div className="relative mb-2 h-[50%]">
        <img
          className="rounded-3xl object-cover w-[100%] h-[100%]"
          src={API_BASE + image}
          alt=""
        />
      </div>
      

      <div>
        <p
          className={`shadow-sm p-2 rounded-md inline-block bg-neutral-300 dark:bg-neutral-800 transition duration-150 dark:text-neutral-300 text-neutral-700
        `}
        >
          {genre}
        </p>
      </div>

      <p className={`text-xl font-bold transition duration-150 dark:text-white`}>
            {title}
      </p>
      <div
        className={` transition duration-150 dark:text-neutral-400 text-neutral-700
        flex md:text-sm sm:text-sm lg:text-lg  text-nowrap gap-2`}
      >
        <p>{date_created}</p>
        <p>&#8226;</p>
        <p>{time_required} min read</p>
      </div>
    </div>
  );
};

export default LatestCard;
