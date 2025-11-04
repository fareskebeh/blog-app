import { Outlet} from "react-router-dom"
import Nav from "./Nav"

const Mobile = () => {
  return (
    <div className="min-h-dvh pt-24 px-4  flex flex-col gap-4 **:transition duration-150">
        <p className="text-black dark:text-white text-2xl font-bold">Settings</p>
        <div>
            <Nav/>
        </div>
        <hr className="dark:border-neutral-900 border-neutral-200"/>
        <Outlet/>
    </div>

  )
}

export default Mobile