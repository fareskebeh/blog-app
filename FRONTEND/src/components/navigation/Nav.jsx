import React from 'react'
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
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
          user ? <></> : pathname==="/login" || pathname==="/register" ||pathname=== "/login-with-email"? <></> : <Link to={"/login"} className='p-2 transition duration-150 hover:opacity-95 bg-black text-sm text-white dark:text-black dark:bg-white rounded-xl cursor-pointer'>Log In</Link>
        }
          <button className='cursor-pointer' onClick={changeTheme}>{
            theme ==="dark" ? <HiOutlineMoon size={28} color='#707070'/> : <HiOutlineSun size={28}/>
          }</button>
      </div>
    </div>
  )
}

export default Nav
