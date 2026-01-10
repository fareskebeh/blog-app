import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE

const axiosInit = axios.create({
    baseURL: API_BASE,
    timeout: 5000,
})

export default axiosInit