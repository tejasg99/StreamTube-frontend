import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";

// Axios instance
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export const getUserChannelProfile = async (username) => {
    try {
        const { data } = await instance.get(`/users/c/${username}`)
        return data?.data
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const getWatchHistory = async () => {
    try {
        const { data } = await instance.get("/users/watch-history")
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const updateAccountDetails = async (updateData) => {
    try {
        const { data } = await instance.patch("/users/update-account-details", updateData)
        toast.success(data?.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const updateChannelDesc = async (updateDesc) => {
    try {
        const { data } = await instance.patch("/users/update-channel-desc", updateDesc);
        toast.success(data?.message);
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const updateAvatar = async (avatarData) => {
    const formData = new formData();

    if(avatarData){
        formData.append("avatar", avatarData)
    }

    try {
        const { data } = await instance.patch("/users/avatar", formData)
        toast.success(data?.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const updateCoverImage = async (coverImageData) => {
    const formData = new formData()

    if(coverImageData){
        formData.append("coverImage", coverImageData)
    }

    try {
        const { data } = await instance.patch("/users/cover-image", formData)
        toast.success(data?.message)
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}

export const clearWatchHistory = async () => {
    try {
        const { data } = await instance.delete("/users/clear-history");
        toast.success(data?.message);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error?.response?.data?.error;
    }
}



