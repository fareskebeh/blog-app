import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'
import {animate, AnimatePresence, motion} from "framer-motion"

const Desktop = () => {
  return (
    <div className='h-dvh pt-24 px-4 flex **:transition-colors duration-150 justify-center items-center'>



      <div className='w-[80%] min-h-[90%] rounded-xl border dark:border-neutral-800 border-neutral-300  overflow-hidden  shadow-md flex'>
        <div className='p-4 dark:bg-neutral-900 border-r dark:border-neutral-800 border-neutral-300 bg-neutral-50 flex-[0.25] flex flex-col gap-4'>
          <p className='text-black dark:text-white text-3xl my-2 mx-4 font-bold'>Settings</p>
          <Nav/>
        </div>
        <div  className='flex-[0.75] bg-white dark:bg-neutral-800'>
          <Outlet/>
        </div>

      </div>

    </div>
  )
}

export default Desktop