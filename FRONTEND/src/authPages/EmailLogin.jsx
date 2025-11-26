import { HiOutlineUser, HiOutlineAtSymbol, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"
import Toggle from "../reusables/Toggle"
import { useState } from "react"
import { Link } from "react-router-dom"
import axiosInit from "../services/axios-init"

const EmailLogin = () => {
  const[credentials,setCredentials] = useState({
    username: "",
    email:"",
    password:"",
  })
  const[save,setSave]=useState(false)
  const[response,setResponse] = useState({
    status: undefined,
    message: "",
  })
  const validator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const submitForm = (e)=> {
    e.preventDefault()

    setResponse({
      status: "loading",
      message:""
    })

    if(!credentials.email||!credentials.password) {
      setResponse({
        status: "error",
        message: "Required fields missing"
      })
      return;
    }
    if(!validator.test(credentials.email)) {
      setResponse({
        status: "error",
        message: "Invalid email format"
      })
      return;
    }
    if(credentials.password.length < 8) {
      setResponse({
        status: "error",
        message: "Password must be at least 8 characters"
      })
    }
    axiosInit.post(`${import.meta.env.VITE_API_BASE}auth/login`, credentials, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res=> {
      
      if(res) {
        if(save) {
         // persist token 
        }
        else {
          localStorage.setItem("token", res.data.access)
        }

        if(res.status===200) {
          window.location.href = "/"
        }
      }
    })
    .catch(()=>{
      setResponse({
        status: "error",
      })
    })

  }

  const [pwVis, setPwVis] = useState(false)
  return (
    <div className='pt-20 h-dvh flex items-center justify-center dark:bg-neutral-950 bg-neutral-100 transition **:transition duration-150'>
      
      <div className='flex flex-col gap-12'>
        <p className='text-3xl dark:text-white font-black'>Use your E-mail to log in</p>

        <div className='flex flex-col gap-2'>

          <div className="relative">
            <HiOutlineUser size={20} className="text-neutral-500 dark:text-neutral-600 absolute top-2.5 left-2"/>
            <input onChange={(e)=> setCredentials({...credentials, username: e.target.value})} value={credentials.username} className='dark:bg-neutral-900 w-full pl-9 bg-neutral-200 rounded-xl p-2 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-600 outline-none' placeholder='Username' type="text" />
          </div>

          <div className="relative">
            <HiOutlineAtSymbol size={20} className="text-neutral-500 dark:text-neutral-600 absolute top-2.5 left-2"/>
            <input onChange={(e)=> setCredentials({...credentials, email: e.target.value})} value={credentials.email} className='dark:bg-neutral-900 w-full pl-9 bg-neutral-200 rounded-xl p-2 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-600 outline-none' placeholder='E-mail' type="text" />
          </div>
          
          <div className="relative">
            <HiOutlineLockClosed size={20} className="text-neutral-500 dark:text-neutral-600 absolute top-2.5 left-2"/>
            <input onChange={(e)=> setCredentials({...credentials, password: e.target.value})} value={credentials.password} className='dark:bg-neutral-900 w-full pl-9 bg-neutral-200 rounded-xl p-2 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-600 outline-none' placeholder='Password' type={pwVis ? "text" : "password"} />
            <button onClick={()=> setPwVis(!pwVis) } className={`${pwVis ? "text-neutral-700 dark:text-neutral-500" : "dark:text-neutral-600 text-neutral-500"} transition  duration-150 absolute cursor-pointer top-2.5 right-3`}>
              {pwVis ? <HiOutlineEye size={20}/> : <HiOutlineEyeOff size={20}/>}
            </button>
          </div>
          
          <div className="flex gap-2 my-2 items-center">
            <span className="text-neutral-700 text-nowrap dark:text-neutral-500">Remember me</span> 
            <Toggle checked={save} onChange={setSave}/>
          </div>
          <button onClick={submitForm} disabled={response.status==="loading"} className={` p-2 dark:text-black bg-black dark:bg-white text-white rounded-xl cursor-pointer flex items-center justify-center hover:opacity-90 disabled:opacity-80 disabled:cursor-not-allowed`}>{response.status==="loading" ? <div className="loader-2 w-5 my-1"/> : "Log In" }</button>
          <p className={`h-4 ${response.status==="error" ? "text-red-500" : "text-green-600"} ${response.message ? "opacity-100" : "opacity-0"} transition duration-150`}>{response.message}</p>
        </div>

        <Link to="/register" className="flex gap-2 items-center justify-center dark:text-neutral-500 text-neutral-700"><HiOutlineUser/>New User? Register instead</Link>
      </div>
    </div>
  )
}

export default EmailLogin
