import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import BlogTile from "./BlogTile";
import axiosInit from "../services/axios-init";
import { Link } from "react-router-dom";
import OtherBlogsError from "../fallback/error/OtherBlogsError";
import NotFound from "../fallback/error/NotFound";
import Empty from "../fallback/empty/Empty";
import OtherBlogsSk from "../fallback/skeleton/OtherBlogsSk";

export function OtherBlogs() {
  const[status,setStatus]= useState('')
  const [posts, setPosts] = useState([]);
  const [searchQ, setSearchQ] = useState("");

  useEffect(() => {
    setStatus('loading')
    axiosInit
      .get("/posts")
      .then((res) => {
        if (res) {
          setPosts(res.data.data);
          setStatus('')
        }
      })
      .catch((err) => {
        console.error(err);
        setStatus('error')
      });
  }, []);

  const search = (query) => {
    setStatus('loading')
    if (query.trim() === "") {
      setStatus('')
      return;
    } else {
      axiosInit
        .get(`/search?q=${query.trim()}`)
        .then((res) => {
          setPosts(res.data.data);
          setStatus('')
        })
        .catch(() => {
          setPosts([]);
          setStatus('404')
        });
    }
  };

  return (
    <div className="py-4">
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
        { status==='loading' ? <OtherBlogsSk/> : 
          status==='error' ? <OtherBlogsError/> :
          status==='404' ? <NotFound/> :
          posts.length ===0 ? <Empty/> :
          (
            posts.map((p,i)=> (
              <Link key={i} to={`/post/${p.id}`} className="contents">
                <BlogTile title={p.title} time_required={p.time_required} id={p.id} genre={p.genre} image={p.image} date_created={p.date_created}/>
              </Link>
            ))
          )
        }
      </div>



    </div>
  );
}
