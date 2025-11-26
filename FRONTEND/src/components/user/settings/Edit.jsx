import { useEffect, useState } from "react"
import {motion as Motion} from "framer-motion"
import {MdOutlineFileUpload} from "react-icons/md"
import { LuTrash2 } from "react-icons/lu";
import axiosInit from "../../../services/axios-init"

const Edit = () => {
  const [profileData,setProfileData] = useState(null)
  const token = localStorage.getItem("token")

  useEffect(()=> {
    axiosInit.get("profile/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res=> {
      console.log(res)
      if(res) {
        setProfileData(res.data)
      }
    })
    .catch(err=> {
      console.error(err)
    })
  },[])

  return (
    <Motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}} className='p-4 **:transition-colors duration-150'>
      <p className='text-3xl mt-2 mb-4 mx-4 dark:text-white text-black font-bold'>Edit Your Profile</p>
      <hr className='border-neutral-200 dark:border-neutral-700'/>

      <div className='p-4 space-y-8'>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <img src={import.meta.env.VITE_API_BASE + profileData?.avatar} className="border w-40 h-40 rounded-full object-cover" alt="" />
          <div className="text-left py-4 space-y-4">
            <p className="text-2xl dark:text-white font-bold">Change your avatar</p>
            <p className="text-lg dark:text-neutral-500 text-neutral-700">The uploaded image should have a maximum size of 800x800</p>
            <div className="flex gap-4 *:flex *:gap-2 *:items-center *:hover:opacity-90 *:cursor-pointer *:active:opacity-80 *:text-lg  *:p-2 *:rounded-xl">
              <button className="bg-black dark:bg-white dark:text-black text-white"><MdOutlineFileUpload/> Upload</button>
              <button className="bg-red-500 text-white"><LuTrash2/> Delete</button>
            </div>
          </div>
        </div>
        
      </div>
    </Motion.div>
  )
}

export default Edit