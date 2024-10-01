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

export const deleteTweet = async (tweetId) => {
    try {
        const { data } = await instance.delete(`/tweets/${tweetId}`)
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error?.response?.data?.error;
    }
}

export const getUserTweets = async (userId) => {
    try {
        const { data } = await instance.get(`/tweets/user/${userId}`)
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error)
        throw error?.response?.data?.error;
    }
}

export const getAllTweets = async ({ pageParam = 1, authenticated = true }) => {
    try {
        const { data } = await instance.get(`/tweets/${authenticated ? "":"?guest=true"}`, {params: {page: pageParam, limit: 10}});
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to fetch all tweets");
        throw error?.response?.data?.error;
    }
}


