import { useEffect, useState } from "react"
import {motion} from "framer-motion"
import {MdOutlineFileUpload} from "react-icons/md"
import { LuTrash2 } from "react-icons/lu";
import Dropdown from "../../../reusables/Dropdown";
import { languages } from "../../../utils/languages";
const Preferences = () => {
  

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}} className='flex flex-col h-full p-4 **:transition-colors duration-150'>
      <p className='text-3xl mt-2 mb-4 mx-4 dark:text-white text-black font-bold'>Preferences</p>
      <hr className='border-neutral-200 dark:border-neutral-700'/>

      <div className='p-4 text-lg space-y-8 text-black dark:text-neutral-400 *:flex *:justify-between *:items-center'>
        <div>
          <p>Color Theme</p>
          <Dropdown defaultVal="Dark" data={['Dark','Light','System']}/>
        </div>
          
        <div>
          <p>App Language</p>
          <Dropdown defaultVal="English" data={languages}/>
        </div>

        <div>
          <p>Font Size</p>
        </div>
        
        
      </div>

      <div className="mt-auto flex gap-2 justify-end *:p-2 *:rounded-xl">
        <button className="dark:bg-white dark:text-black bg-black text-white">Save Changes</button>
        <button className="dark:bg-neutral-700 bg-neutral-200 dark:text-white">Reset</button>
      </div>
    </motion.div>
  )
}

export default Preferences