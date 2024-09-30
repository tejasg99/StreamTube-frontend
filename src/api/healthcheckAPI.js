import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";

// Axios instance
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const healthcheck = async () => {
    try {
        const { data } = await instance.get("/healthcheck");
        toast.success(data?.message);
        return data?.message;
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
};