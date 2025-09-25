import React from 'react'
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const Nav = ({theme, setTheme}) => {
  return (
    <div className='p-6 mb-8 flex justify-between'>
      <button className='cursor-pointer' onClick={()=> theme==="dark" ? setTheme("light") : setTheme("dark")}>{
        theme ==="dark" ? <HiOutlineMoon size={24} color='#707070'/> : <HiOutlineSun size={24}/>
        }</button>
    </div>
  )
}

export default Nav
