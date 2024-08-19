import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";

// Axios instance
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export const publishVideo = async (videoData) => {
    const formData = new formData();
    
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

