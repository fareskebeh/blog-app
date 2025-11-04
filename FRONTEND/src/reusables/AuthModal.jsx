import {motion} from "framer-motion"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const AuthModal = ({setModal}) => {
  
  return (
    <motion.div onClick={()=>setModal(false)} className="fixed inset-0 z-999 flex items-center justify-center bg-black/50" initial={{opacity:0}} exit={{opacity:0}} animate={{opacity:1}} transition={{duration:0.2}}>
        <motion.div onClick={(e)=> e.stopPropagation()} initial={{y:20}} exit={{y:20}} animate={{y:0}} transition={{duration: 0.2}} className="dark:bg-neutral-950 bg-neutral-100 w-[90%] flex flex-col gap-8 sm:w-[70%] md:w-[30%] p-4 rounded-xl">
          <p className="dark:text-white">To continue this action, you must be logged in</p>
          <div className="flex items-center justify-end gap-2 *:p-2 *:rounded-xl *:shadow-sm *:hover:opacity-90 *:active:opacity-80 *:transition duration-150">
            <Link className="text-white bg-black dark:text-black dark:bg-white " to="/login">Log In</Link>
            <button onClick={()=>setModal(false)} className="cursor-pointer dark:text-neutral-300 dark:bg-neutral-900 bg-neutral-200" >Close</button>
          </div>
        </motion.div>
    </motion.div>
  )
}

export default AuthModal