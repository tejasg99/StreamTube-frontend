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
    limit = null,
    authenticated = true,
) => {
    try {
        const url = new URL(`${API_URL}/comments/${videoId}${authenticated ? "" : "?guest=true"}`)

        if(page) url.searchParams.set("page", page)
        if(limit) url.searchParams.set("limit", limit)
        
        const { data } = await instance.get(url.href)
        toast.success(data?.message)
        // console.log("getVideoComments response: ",data?.data)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error?.response?.data?.error;
    }
}

export const addComment = async (videoId, comment) => {
    try {
        const { data } = await instance.post(`/comments/${videoId}`, comment)
        toast.success(data?.message);
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error?.response?.data?.error;
    }
}

export const updateComment = async (commentId, comment) => {
    try {
        const { data } = await instance.patch(`/comments/c/${commentId}`, comment)
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const deleteComment = async (commentId) => {
    try {
        const { data } = await instance.delete(`/comments/c/${commentId}`)
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}
