import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";

// Axios instance
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export const getVideoComments = async (
    videoId = null,
    page = null,
    limit = null
) => {
    try {
        const url = new URL(`${API_URL}/comments/${videoId}`)

        if(page) url.searchParams.set("page", page)
        if(limit) url.searchParams.set("limit", limit)
        
        const { data } = await instance.get(url.href)
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error?.response?.data?.error;
    }
}

export const addComment = async (videoId, commentData) => {
    try {
        const { data } = await instance.post(`/comments/${videoId}`, commentData)
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error?.response?.data?.error;
    }
}