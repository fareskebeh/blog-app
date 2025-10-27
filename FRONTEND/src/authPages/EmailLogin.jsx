import { HiOutlineUser, HiOutlineAtSymbol, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"
import Toggle from "../utils/Toggle"
import { useState } from "react"
import { Link } from "react-router-dom"

const EmailLogin = () => {
  const [pwVis, setPwVis] = useState(false)
  return (
    <div className='pt-20 h-dvh flex items-center justify-center dark:bg-neutral-950 bg-neutral-100 transition **:transition duration-150'>
      
      <div className='flex flex-col gap-12'>
        <p className='text-3xl dark:text-white font-black'>Use your E-mail to log in</p>

        <div className='flex flex-col gap-2'>

          <div className="relative">
            <HiOutlineAtSymbol size={20} className="text-neutral-500 dark:text-neutral-600 absolute top-2.5 left-2"/>
            <input className='dark:bg-neutral-900 w-full pl-9 bg-neutral-200 rounded-xl p-2 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-600 outline-none' placeholder='E-mail' type="text" />
          </div>
          
          <div className="relative">
            <HiOutlineLockClosed size={20} className="text-neutral-500 dark:text-neutral-600 absolute top-2.5 left-2"/>
            <input className='dark:bg-neutral-900 w-full pl-9 bg-neutral-200 rounded-xl p-2 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-600 outline-none' placeholder='Password' type={pwVis ? "text" : "password"} />
            <button onClick={()=> setPwVis(!pwVis) } className={`${pwVis ? "text-neutral-700 dark:text-neutral-500" : "dark:text-neutral-600 text-neutral-500"} transition  duration-150 absolute cursor-pointer top-2.5 right-3`}>
              {pwVis ? <HiOutlineEye size={20}/> : <HiOutlineEyeOff size={20}/>}
            </button>
          </div>
          
          <div className="flex gap-2 my-2 items-center">
            <span className="text-neutral-700 text-nowrap dark:text-neutral-500">Remember me</span> 
            <Toggle />
          </div>
          <button className='p-2  dark:text-black bg-black dark:bg-white text-white rounded-xl cursor-pointer hover:opacity-90'>Log In</button>
        </div>

        <Link to="/register" className="flex gap-2 items-center justify-center dark:text-neutral-500"><HiOutlineUser/>New User? Register instead</Link>
      </div>
    </div>
  )
}

export default EmailLogin
