import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";

// Axios instance
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export const toggleSubscription = async (channelId) => {
    try {
        const { data } = await instance.post(`/subscriptions/c/${channelId}`)
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}

export const getChannelSubscribers = async (channelId) => {
    try {
        const { data } = await instance.get(`/subscriptions/c/${channelId}`)
        return data?.data;
    } catch (error) {
        throw error?.response?.data;
    }
}

export const getSubscribedChannels = async (subscriberId) => {
    try {
        const { data } = await instance.get(`/subscriptions/u/${subscriberId}`)
        return data?.data;
    } catch (error) {
        throw error?.response?.data;
    }
}