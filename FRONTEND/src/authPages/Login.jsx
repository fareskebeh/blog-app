import { FaGithub, FaGoogle, FaFacebookF } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <div className="h-[100dvh] **:transition flex justify-center items-center transition duration-150 bg-neutral-100 dark:bg-neutral-950 pt-20">
        <div className="flex flex-col gap-8">
            <p className="text-2xl sm:text-3xl w-[80%] md:text-4xl dark:text-white font-black">Log In to receive my latest blogs</p>

            <div className="flex *:flex *:hover:opacity-90 *:gap-2 *:text-white gap-4 flex-col *:justify-center *:cursor-pointer *:p-3 *:rounded-xl *:items-center *:text-xl *:outline-none">
                <button className="bg-neutral-900 dark:bg-white dark:text-black"><FaGithub size={24}/>Continue with GitHub</button>
                <button className="bg-red-700"><FaGoogle size={24}/>Continue with Google</button>
                <button className="bg-sky-800"><FaFacebookF size={24}/>Continue with Facebook</button>
            </div>

            <div className="flex items-center justify-center dark:text-neutral-400 text-neutral-600">
                <Link to="/login-with-email" className="flex items-center gap-2 cursor-pointer transition hover:opacity-90 duration-150"><HiOutlineMail/>Continue with E-mail instead</Link>
            </div>
        </div>
        
    </div>
  )
}

export default Login
