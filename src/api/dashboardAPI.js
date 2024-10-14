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
        toast.error(error?.response?.data?.message)
        throw error?.response?.data;
    }
}

export const getChannelVideos = async (channelId) => {
    // console.log("getChannelVideos with channelId: ",channelId)
    try {
        const { data } = await instance.get(`/dashboard/videos/${channelId}`)
        // console.log("getChannelVideos Result: ", data)
        // console.log("Video array result: ",data?.data?.docs[0])
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
        throw error?.response?.data;
    }
}

export const getChannelInfo = async () => {
    try {
        const { data } = await instance.get(`/dashboard/about`);
        // console.log("getChannelInfo response: ", data?.data)
        return data?.data; 
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}