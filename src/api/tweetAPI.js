import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";

// Axios instance
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export const createTweet = async (tweetContent) => {
    try {
        const { data } = await instance.post("/tweets/", tweetContent)
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error?.response?.data?.error;
    }
}

export const updateTweet = async (tweetId, tweetContent) => {
    try {
        const { data } = await instance.patch(`/tweets/${tweetId}`, tweetContent)
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error?.response?.data?.error;
    }
}


