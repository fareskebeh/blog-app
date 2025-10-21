import { createContext, useState } from "react";
const [user, setUser] = useState(null)


export const authContext = createContext({user,setUser})