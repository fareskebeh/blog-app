import React, { useState, useEffect } from 'react'
import {FaExclamationTriangle} from "react-icons/fa"

const Error = ({message}) => {
  const[prompt,setPrompt]=useState('')
  useEffect(()=> {
    if(message===404) {
      setPrompt("No posts with such keywords/topic.. try different words")
    }
  },[])
  
  return (
    <div className='w-full h-50 flex rounded-3xl justify-center items-center bg-red-900 opacity-70'>
      <div className='flex flex-col text-center items-center gap-2 text-white'>
        <FaExclamationTriangle size={50}/>
        <p className='text-base'>{prompt}</p>
      </div>
    </div>
  )
}

export default Error
