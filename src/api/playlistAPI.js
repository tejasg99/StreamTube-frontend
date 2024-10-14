import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";

// Axios instance
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export const createPlaylist = async (playlistData) => {
    try {
        const { data } = await instance.post("/playlist/", playlistData)
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}

export const updatePlaylist = async (playlistData, playlistId) => {
    try {
        const { data } = await instance.patch(`/playlist/${playlistId}`, playlistData)
        toast.success(data?.message);
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}

export const addVideoToPlaylist = async (videoId, playlistId) => {
    try {
        const { data } = await instance.patch(`/playlist/add/${videoId}/${playlistId}`)
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}

export const removeVideoFromPlaylist = async (videoId, playlistId) => {
    try {
        const { data } = await instance.patch(`/playlist/remove/${videoId}/${playlistId}`);
        toast.success(data?.message)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}

export const getPlaylistById = async (playlistId) => {
    try {
        const { data } = await instance.get(`/playlist/${playlistId}`)
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}

export const getUserPlaylists = async (userId) => {
    try {
        const { data } = await instance.get(`/playlist/user/${userId}`)
        toast.success(data?.message);
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}

export const deletePlaylist = async (playlistId) => {
    try {
        const { data } = await instance.delete(`/playlist/${playlistId}`)
        toast.success(data?.message);
        return data?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}

export const checkVideoInPlaylist = async (playlistId, videoId) => {
    try {
        const { data } = await instance.get(`/playlist/check-video/${playlistId}/${videoId}`);
        return data?.data?.isPresent;
   } catch (error) {
        throw error?.response?.data;     
   }
}