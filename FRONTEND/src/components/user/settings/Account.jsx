import { HiOutlineExternalLink } from "react-icons/hi"
import {FaRegTrashAlt} from "react-icons/fa"
import {motion as Motion} from "framer-motion"

const Account = () => {
  return (
    <Motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}} className='p-4 **:transition-colors duration-150'>
      <p className='text-3xl mt-2 mb-4 mx-4 dark:text-white text-black font-bold'>Account</p>
      <hr className='border-neutral-200 dark:border-neutral-700'/>

      <div className='p-4 space-y-8'>
        
        <div className='flex justify-between'>
          <p className='text-lg dark:text-neutral-300 text-black'>Change your username</p>
          <button className='bg-black hover:opacity-90 active:opacity-80  p-2 rounded-xl cursor-pointer text-white dark:bg-white dark:text-black flex items-center gap-2'>Change <HiOutlineExternalLink/></button>
        </div>

        <div className='flex justify-between'>
          <p className='text-lg dark:text-neutral-300 text-black '>Change your password</p>
          <button className='bg-black hover:opacity-90 active:opacity-80  p-2 rounded-xl cursor-pointer text-white dark:bg-white dark:text-black flex items-center gap-2'>Change <HiOutlineExternalLink/></button>
        </div>

        <div className="p-4 border border-red-800/50 bg-red-600/10 flex flex-col gap-2 justify-between items-start rounded-xl">
            <p className="text-xl dark:text-white">Delete your account</p>
            <p className="w-[80%] dark:text-red-300 text-red-700">WARNING: All of your saved posts, liked posts and comments will be erased, this action cannot be undone</p>
          <button className="flex hover:opacity-95 active:opacity-90 gap-2 items-center p-2 px-3 cursor-pointer rounded-xl text-red-100 bg-[#cf2929]">Delete my account <FaRegTrashAlt/></button>

        </div>
        
      </div>
    </Motion.div>
  )
}

export default Account