import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../constants";

// Axios instance
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})