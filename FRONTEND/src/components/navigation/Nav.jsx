import React from 'react'
import { HiOutlineSun, HiOutlineMoon, HiOutlineUser } from "react-icons/hi";
import {IoSettingsOutline} from "react-icons/io5"
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const {pathname} = useLocation()
  const {theme, changeTheme} = useTheme()
  const{user}= useAuth()
  return (
    <div className='fixed z-999 inset-x-0 top-0 p-6 mb-8 flex justify-between items-center bg-neutral-100 dark:bg-neutral-950 transition duration-150'>
      <div/>
      <div className='flex items-center gap-4'>
        {
          user ? 
          <Link to={pathname!=="/me" ? "/me" : "/settings"} className='flex gap-2 dark:text-[#707070] text-neutral-500 rounded-3xl p-2 dark:bg-neutral-800 bg-white transition *:transition duration-150 '>
            { pathname!=="/me" ? <HiOutlineUser size={24}/> : <IoSettingsOutline size={24}/>}
          </Link>
          : 
          pathname==="/login" || pathname==="/register" ||pathname=== "/login-with-email"? <></> : <Link to={"/login"} className='p-2 transition duration-150 hover:opacity-95 bg-black text-sm text-white dark:text-black dark:bg-white rounded-xl cursor-pointer'>Log In</Link>
        }
          <button className='cursor-pointer' onClick={changeTheme}>
          {
            theme ==="dark" ? <HiOutlineMoon size={28} color='#707070'/> : <HiOutlineSun size={28}/>
          }
          </button>
      </div>
    </div>
  )
}

export default Nav
