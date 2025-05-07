import React, { useContext } from "react";
import themeContext from "../data/themeContext";
import Img from "../assets/img/placeholder.png";
const API_BASE = import.meta.env.VITE_API_BASE;


const LatestCard = ({date_created, genre, id, image, time_required, title}) => {
  const { theme } = useContext(themeContext);
  return (
    <div
      className={`
    ${theme === "dark" ? "bg-neutral-800 border-b-2  border-b-neutral-700" : "bg-white"}
    flex flex-col justify-around gap-2 box-border flex-1 shadow-lg p-6 rounded-4xl  cursor-pointer transition-all duration-200 hover:-translate-y-1 active:-translate-y-2`}
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
          className={`shadow-sm p-2 rounded-md inline-block
        ${theme === "dark" ? "bg-neutral-700" : "bg-neutral-100"}
        `}
        >
          {genre}
        </p>
      </div>

      <p className={`text-xl font-bold`}>
            {title}
      </p>
      <div
        className={`
        ${theme === "dark" ? "**:text-neutral-400" : "**:text-neutral-600"}
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
