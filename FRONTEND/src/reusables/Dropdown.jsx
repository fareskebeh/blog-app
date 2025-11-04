import { HiChevronDown } from 'react-icons/hi'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const Dropdown = ({data, defaultVal}) => {
    const[open,setOpen] = useState(false)
    const[newVal,setNewVal]=useState(defaultVal)
  return (
    <div onClick={()=>setOpen(!open)} className='**:transition duration-150 dark:bg-neutral-900 bg-neutral-100 cursor-pointer flex w-30 justify-between items-center p-2 rounded-xl text-base relative'>
        <p className='select-none'>{newVal}</p>
        <HiChevronDown className={`${open ? "transform:rotate-180" : ""}`}/>
        <AnimatePresence>
        { open &&
        <motion.div onClick={(e)=> e.stopPropagation()} initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} transition={{duration:0.1}} className='absolute p-2 shadow-md bg-neutral-100 rounded-xl top-[110%] inset-x-0 flex flex-col gap-2 dark:bg-neutral-900 max-h-60 overflow-y-auto'>
            {
                data.map((d,index)=> (
                    <p onClick={()=> {setNewVal(d); setOpen(false)}} className={`p-2 select-none rounded-lg ${newVal===d ? "bg-black text-white dark:text-black dark:bg-white" : "hover:bg-neutral-200 dark:hover:bg-neutral-800"}`} key={index}>{d}</p>
                ))
            }
        </motion.div>
        }
        </AnimatePresence>
    </div>
  )
}

export default Dropdown