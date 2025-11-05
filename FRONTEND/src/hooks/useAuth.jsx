import { createContext, useContext, useEffect, useState } from "react"
import axiosInit from "../services/axios-init"

const authContext = createContext()

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [token,setToken]=useState("")
    const[loading,setLoading] = useState(true)
    
    useEffect(()=> {
        const stored= localStorage.getItem("token")
        if(!stored) {
            setLoading(false)
            return;
        }
        setLoading(true)

        axiosInit.get(`${import.meta.env.VITE_API_BASE}auth/user`, {
            headers: {
                Authorization: `Bearer ${stored}`
            }
        })
        .then(res=>setUser(res.data))
        .catch(err=> console.error(err))
        .finally(()=> {
            setToken(stored)
            setLoading(false)
        })
    },[])

    return (
        <authContext.Provider value={{user, loading}}>
            {children}
        </authContext.Provider>
  )
}

export const useAuth = ()=> useContext(authContext)

