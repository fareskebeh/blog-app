import { motion as Motion } from "framer-motion";
import LatestCard from "./LatestCard";
import {Link} from "react-router-dom"


const LatestBlogs = ({ posts}) => {
   return (
    <Motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <div
        className={`flex justify-between gap-8 p-8
        `}
      >
        {
          posts.map((post,index)=> {
            return (
            <Link className="contents" to={`post/${post.id}`}  key={index}>
              <LatestCard id={post.id} date_created={post.date_created} time_required={post.time_required} title={post.title} genre={post.genre} image={post.image}/>
            </Link>
            );
          })
        }
      </div>
    </Motion.div>
  );
};

export default LatestBlogs;
