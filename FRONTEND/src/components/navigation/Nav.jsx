import React from 'react'
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { useTheme } from '../../hooks/useTheme';

const Nav = () => {
  const {theme, changeTheme} = useTheme()
  return (
    <div className='p-6 mb-8 flex justify-between bg-white dark:bg-black'>
      <button className='cursor-pointer' onClick={changeTheme}>{
        theme ==="dark" ? <HiOutlineMoon size={24} color='#707070'/> : <HiOutlineSun size={24}/>
        }</button>
    </div>
  )
}

export default Nav
