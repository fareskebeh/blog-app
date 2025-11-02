import React, {useEffect, useState} from 'react'
import axiosInit from '../../services/axios-init'
import Avatar from "../../assets/img/avatar.png"
import SavedBlogs from './SavedBlogs'

const Me = ({user}) => {
  const[profileInfo,setProfileInfo] = useState(null)
  const token = localStorage.getItem("token")

  useEffect(()=> {
    axiosInit.get(`${import.meta.env.VITE_API_BASE}/profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res=> {
      setProfileInfo(res?.data)
    }).catch(err=> {
    })
  },[token])

  return (
    <div className='md:h-dvh md:*:flex-1 pt-24 px-4 gap-8 flex flex-col **:transition duration-150 md:flex-row'>
      <div className='flex gap-4 flex-col items-center md:items-start md:flex-row'>
        <img className='rounded-full w-30 sm:w-40 md:w-50' src={profileInfo?.avatar ? profileInfo.avatar : Avatar}/>
        <div className='space-y-2 text-center md:text-left'>
          <p className='dark:text-white text-black text-2xl font-bold sm:text-3xl md:text-4xl'>@{user?.username}</p>
          <p className='dark:text-neutral-700 text-neutral-700 text-lg sm:text-xl md:text-2xl'>See your account info</p>
        </div>
      </div>
      <div className='h-px md:hidden dark:bg-neutral-900 bg-neutral-200'/>

      <SavedBlogs/>
    </div>
  )
}

export default Me