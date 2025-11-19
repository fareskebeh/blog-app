import { HiOutlineMail } from "react-icons/hi"
import { Link } from "react-router-dom"
import Google from "../assets/img/google.svg"
import Gh from "../assets/img/github.svg"
import LkdIn from "../assets/img/linkedin.svg"


const Login = () => {
  const providers = [
    {
      name: "Google",
      link: "",
      icon: Google,
    },
    {
      name: "GitHub",
      link: "",
      icon: Gh,
    },
    {
      name: "LinkedIn",
      link: "",
      icon: LkdIn,
    }
  ]

  return (
    <div className="h-dvh **:transition flex justify-center items-center transition duration-150 bg-neutral-100 dark:bg-neutral-950 pt-20">
        <div className="flex flex-col gap-8 flex-[0.9] sm:flex-[0.6] md:flex-[0.4]">
            <p className="text-2xl sm:text-3xl w-[80%] md:text-4xl dark:text-white font-black">Log In to receive my latest blogs</p>

            <div className="flex *:dark:bg-neutral-900 *:bg-neutral-200 *:shadow-md *:text-black *:hover:opacity-90 *:dark:text-white gap-4 flex-col *:cursor-pointer *:p-3 *:rounded-xl *:text-xl *:outline-none">
                {
                  providers?.map((p,i)=> (
                    <Link className="flex justify-center" to={p.link} key={i}>
                      <div className="flex flex-1 gap-4 justify-center">
                        <img className={`w-6 ${p.icon===Gh && "invert-100 dark:invert-0"}`} src={p.icon}/>
                        <p className="text-base sm:text-lg md:text-xl">Continue with {p.name}</p>
                      </div>
                    </Link>
                  ))
                }
            </div>

            <div className="flex items-center justify-center dark:text-neutral-400 text-neutral-600">
                <Link to="/login-with-email" className="flex items-center gap-2 cursor-pointer transition hover:opacity-90 duration-150"><HiOutlineMail/>Continue with E-mail instead</Link>
            </div>
        </div>
        
    </div>
  )
}

export default Login
