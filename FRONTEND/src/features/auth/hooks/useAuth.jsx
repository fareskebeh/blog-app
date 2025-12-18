import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInit from "@/services/axios-init"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const navigate = useNavigate()

const [user,setUser] = useState(null)
  const[response,setResponse] = useState({
    status: undefined,
    message: "",
  })
  const validator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const register = (e, credentials)=> {
    e.preventDefault()
    setResponse({
      status: "loading",
      message: null
    })

    if(!credentials.email||!credentials.password1||!credentials.password2||!credentials.username) {
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
    if(credentials.password1.length < 8) {
      setResponse({
        status: "error",
        message: "Password must be at least 8 characters"
      })
      return;
    }
    if(credentials.password1!==credentials.password2) {
      setResponse({
        status: "error",
        message: "Passwords do not match"
      })
      return;
    }

    axiosInit.post(`/auth/registration/`, credentials, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res)=> {
      if(res.status===201) {
        navigate("/verify")
      }
    })
    .catch(err=>{
      setResponse({
        status: "error",
        message: err.data
      })
    })

  }

  const login = (credentials)=> {
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
      return
    }
    axiosInit.post(`/auth/login`, credentials, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res=> {
      
      if(res) {
        if(credentials.save) {
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
    
    useEffect(()=> {
        const stored= localStorage.getItem("token")
        if(!stored) {
            setResponse({
                status: "",
                message: ""
            })
            return;
        }
        setResponse({
            status: "loading",
            message: ""
        })

        axiosInit.get(`/auth/user`, {
            headers: {
                Authorization: `Bearer ${stored}`
            }
        })
        .then(res=>setUser(res.data))
        .catch(err=> console.error(err))
        .finally(()=> {
            setResponse({
                status: "",
                message: ""
            })
        })
    },[])

    return (
        <AuthContext.Provider value={{user, response, login, register}}>
            {children}
        </AuthContext.Provider>
  )
}

export const useAuth = ()=> useContext(AuthContext)