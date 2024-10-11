import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";

// Axios instance
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export const publishVideo = async (videoData) => {
    const formData = new FormData();
    
    formData.append("videoFile", videoData.videoFile)
    formData.append("title", videoData.title)
    formData.append("thumbnail", videoData.thumbnail)
    formData.append("description", videoData.description)
    formData.append("owner", videoData.owner)
    formData.append("duration", videoData.duration)

    try {
        const { data } = await instance.post("/videos", formData);
        toast.success(data?.message);
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const togglePublishStatus = async (videoId) => {
    try {
        const { data } = await instance.patch(`/videos/toggle/publish/${videoId}`)
        toast.success(data?.message)
        return data?.data
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const updateVideo = async (videoId, data) => {
    const formData = new FormData();

    if(data.thumbnail) {
        formData.append("thumbnail", data.thumbnail)
    }
    formData.append("title", data.title)
    formData.append("description", data.description)

    try {
        const { data } = await instance.patch(`/videos/${videoId}`, formData)
        toast.success(data?.message)
        return data?.data
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const deleteVideo = async (videoId) => {
    try {
        const { data } = await instance.delete(`/videos/${videoId}`)
        toast.success(data?.message);
        return data?.message;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const getVideoById = async (videoId, isAuthenticated = true) => {
    try {
        const url = `/videos/${videoId}${isAuthenticated ? "": "?guest=true"}`;
        const { data } = await instance.get(url)
        toast.success(data?.message)
        console.log("getVideoById response: ", data?.data)
        return data?.data
    } catch (error) {
        toast.error(error?.response?.data?.error || "Error while fetching video by Id");
        throw error?.response?.data?.error || "Error: getVideoById";
    }
}

export const getAllVideos = async (
    page = null,
    userId = null,
    sortBy = null,
    sortType = null,
    query = null,
    limit = null
) => {
    try {
        const url = new URL(`${API_URL}/videos`)
        if(userId) url.searchParams.set("userId", userId)
        if(page) url.searchParams.set("page", page)
        if(sortBy) url.searchParams.set("sortBy", sortBy)
        if(sortType) url.searchParams.set("sortType", sortType)
        if(query) url.searchParams.set("query", query)
        if(limit) url.searchParams.set("limit", limit)
        const response = await instance.get(url.href)
        // console.log("getAllVideos result: ",response.data?.data);
        return response?.data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const getNextVideos = async (videoId) => {
    try {
        const { data } = await instance.get(`/videos/next/${videoId}`)
        toast.success(data?.message);
        console.log("getNextVideos response: ", data?.data)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}
