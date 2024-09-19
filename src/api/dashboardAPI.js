import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../constants";

// Axios instance
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const getChannelStats = async (channelId) => {
    try {
        const { data } = await instance.get(`/dashboard/stats/${channelId}`)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error?.response?.data?.error;
    }
}

export const getChannelVideos = async (channelId) => {
    try {
        const { data } = await instance.get(`/dashboard/videos/${channelId}`)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error?.response?.data?.error;
    }
}

export const getChannelInfo = async () => {
    try {
        const { data } = await instance.get(`/dashboard/about`);
        return data?.data; 
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}