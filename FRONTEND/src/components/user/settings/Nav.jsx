import { Link, useLocation } from 'react-router-dom'
import {HiOutlineUser, HiOutlinePencil } from "react-icons/hi"
import {IoSettingsOutline} from "react-icons/io5"


const Nav = () => {
    const {pathname} = useLocation()
    const settings = [
        {
            title: "Account",
            path: "account",
            icon: <HiOutlineUser/>
        },
        {
            title: "Edit Profile",
            path: "edit-profile",
            icon: <HiOutlinePencil/>
        },
        {
            title: "Preferences",
            path: "preferences",
            icon: <IoSettingsOutline/>
        }
    ]
   
    return (
    <div className='flex flex-col gap-2 *:p-2 **:transition duration-150'>
        {
            settings.map((s,index)=> (
                <Link key={index} className={`${pathname===`/settings/${s.path}` ? "dark:bg-white bg-black text-white dark:text-black" : "text-neutral-600 dark:text-neutral-400"} rounded-xl flex justify-between items-center font-medium text-lg`} to={s.path}>
                    <div className='flex items-center gap-4'>
                        {s.icon}
                        {s.title}
                    </div>
                </Link>
            ))
        }
    </div>
  )
}

export default Nav