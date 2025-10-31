import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import BlogTile from "./BlogTile";
import axiosInit from "../services/axios-init";
import { Link } from "react-router-dom";
import Loading from "../fallback/Loading"
import Error from "../fallback/Error"

export function OtherBlogs() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    setLoading(true);
    axiosInit
      .get("/posts")
      .then((res) => {
        if (res) {
          setPosts(res.data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  const search = (query) => {
    setLoading(true);
    if (query.trim() === "") {
      setLoading(false)
      return;
    } else {
      axiosInit
        .get(`search?q=${query.trim()}`)
        .then((res) => {
          setPosts(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setPosts([]);
          setError(true);
          setLoading(false)
        });
    }
  };

  return (
    <div>
      <div
        className={`**:transition duration-150
        flex flex-col items-center pb-10`}
      >
        <p className={`ml-2 dark:text-white my-4 pl-1 text-2xl font-extralight`}>Other Blogs</p>

        <div className={`flex gap-2 ml-2`}>
          <input
            onChange={(e) => {
              setSearchQ(e.target.value);
              search(searchQ);
            }}
            className={`flex-[0.7] dark:text-white dark:bg-neutral-900 caret-blue-500 dark:placeholder-neutral-700 bg-neutral-200 placeholder-neutral-400
            rounded-4xl py-2 px-4 outline-none shadow-md`}
            placeholder="Search for a keyword/topic.."
            type="text"
          />
          <button
            onClick={() => {
              search(searchQ);
            }}
            type="button"
            className={`transition-all duration-0.3 hover:scale-102 active:scale-100 p-3 rounded-full bg-blue-600 cursor-pointer **:fill-white`}
          >
            <FaSearch />
          </button>
        </div>
      </div>




      <div className={`box-border`}>
        { loading ? <Loading/> :
        posts.length !== 0 ? (
          posts.map((post, index) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <BlogTile
                id={post.id}
                title={post.title}
                image={post.image}
                genre={post.genre}
                date_created={post.date_created}
                time_required={post.time_required}
                likes={post.likes}
                comment_count={post.comment_count}
              />
    
            </Link>
          ))
        ) : (
          <Error message={404}/>        
          )
          }
      </div>



    </div>
  );
}
