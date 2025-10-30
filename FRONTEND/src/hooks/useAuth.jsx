import { createContext, useContext, useEffect, useState } from "react"
import axiosInit from "../services/axios-init"

const authContext = createContext()

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [token,setToken]=useState("")
    useEffect(()=> {
        const stored = localStorage.getItem("token")
        if(stored){
            setToken(stored)
        }
    },[])

    useEffect(()=> {
        if (!token) return;

        axiosInit.get(`${import.meta.env.VITE_API_BASE}auth/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res=> {
            setUser(res?.data)
        }).catch(err=> {
            console.log(err)
        })
    },[token])

    return (
        <authContext.Provider value={{user}}>
            {children}
        </authContext.Provider>
  )
}

export const useAuth = ()=> useContext(authContext)

