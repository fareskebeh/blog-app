import React, {useEffect, useState} from 'react'
import axiosInit from '../../services/axios-init'
import {FiRefreshCw, FiBookmark} from "react-icons/fi"
import BlogTile from "../BlogTile"
import {Link} from "react-router-dom"

const SavedBlogs = () => {
  const token = localStorage.getItem("token")
  const[posts,setPosts] = useState([])
  const [response, setResponse] = useState({
    message:"",
    status:"",
  })

  const getPosts=()=> {
    setResponse({
      ...response,
      status:"loading"
    })
    axiosInit.get("saved", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res)=> {
      setPosts(res.data.data)
      setResponse({
        ...response,
        status:"success"
      })
    })
    .catch(err=> {
      setResponse({
        status: "error",
        message: "Could not retrieve posts, Try again."
      })
    })
  }

  useEffect(()=> {
    getPosts()
  },[])

  return (
    <div className='**:transition h-full duration-150 py-4 flex flex-1 flex-col gap-4'>
      <div className='space-y-2'>
        <p className='dark:text-white text-xl sm:text-2xl md:text-3xl font-bold'>Saved Blogs</p>
        <p className='dark:text-neutral-700 text-neutral-700 text-base sm:text-xl'>Below is a list of blogs you have saved</p>
      </div>

      <div className='rounded-2xl shadow-md border border-neutral-300 dark:border-neutral-800 overflow-y-scroll bg-neutral-200 dark:bg-neutral-900 flex-1 h-full flex flex-col items-center justify-start'>
        {
          response.status==="error"&&
          <div className='h-full cursor-pointer flex flex-col gap-4 justify-center items-center'>
            <FiRefreshCw className='size-12 text-[#ad2e24]'/>
            <p className='text-lg sm:text-xl md:text-2xl w-[45%] text-center text-neutral-500'>{response.message}</p>
          </div>
        }
        {
          response.status==="loading"&&
          <div className='flex justify-center items-center h-full'>
            <div className='loader-2 w-8'/>
          </div>
        }
        {
          posts ? 
          (
            posts.map((p,index)=> (
              <Link to={`/post/${p.id}`} key={index}>
                <BlogTile title={p.title} image={p.image} genre={p.genre} date_created={p.date_created} time_required={p.time_required}/>
              </Link>
            ))
          )
          :
          <div className='flex-1 flex items-center justify-center flex-col gap-4'>
            <FiBookmark className='size-12 text-neutral-500'/>
            <p className='text-lg md:text-xl w-[45%] text-center text-neutral-500'>You don't have any saved posts</p>
          </div>
        }
      </div>
    </div>
  )
}

export default SavedBlogs