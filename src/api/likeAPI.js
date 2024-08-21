import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";

// Axios instance
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export const toggleVideoLikes = async (videoId) => {
    try {
        const { data } = await instance.post(`/likes/toggle/v/${videoId}`)
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const toggleCommentLike = async (commentId) => {
    try {
        const { data } = await instance.post(`/likes/toggle/c/${commentId}`)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

