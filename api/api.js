import axios from "axios";

const api = axios.create({
    baseURL:"https://quickpayqrbackend.onrender.com"
})

export default api;