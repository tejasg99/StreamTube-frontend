import axios from "axios";
import { API_URL } from "../constants";
import toast from "react-hot-toast";

// Axios instance
const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

//Axios request, response interceptors
instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('accessToken')
        if(token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => response,

    async(error) => {
        const originalRequest = error.config;
        if(error?.response?.data?.error === "jwt expired" && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                console.log("Access token is being refreshed")
                const { accessToken } = await refreshAccessToken()
                localStorage.setItem('accessToken', accessToken);
                instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export const refreshAccessToken = async () => {
  try {
    const { data } = await instance.post("/users/refresh-token")
    return data?.data
  } catch (error) {
    throw error?.response?.data;
  }
}

export const register = async (data) => {
    // new form object
    const formData = new FormData();

    if(!data.get("avatar")){
        toast.error("Avatar is required")
        return;
    }
    // appending user details
    formData.append("avatar", data.get("avatar"))
    if(data.get("coverImage")){
        formData.append("coverImage", data.get("coverImage"))
    }
    formData.append("username", data.get("username"))
    formData.append("email", data.get("email"))
    formData.append("fullname", data.get("fullname"))
    formData.append("password", data.get("password"))

    try {
        const { data: responseData} = await instance.post("/users/register", formData)
        toast.success(responseData?.message)
        return responseData?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}

export const login = async (formData) => {
    // console.log(formData);
    try {
        const { data } = await instance.post("/users/login", formData)
        localStorage.setItem('accessToken', data.data.accessToken)
        instance.defaults.headers.common["Authorization"] = `Bearer ${data.data.accessToken}`;
        toast.success(data?.message);
        return data?.data?.user;
    } catch (error) {
        console.log("Error with data: ", error?.response?.data)
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}

export const logout = async () => {
    try {
        const { data } = await instance.post("/users/logout");
        localStorage.removeItem('accessToken')
        delete instance.defaults.headers.common["Authorization"]
        toast.success(data?.message)
        return data
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}

export const currentUser = async () => {
    try {
        const { data } = await instance.get("/users/current-user")
        return data?.data?.user
    } catch (error) {
        throw error?.response?.data;
    }
}

export const changePassword = async (passwordData) => {
    try {
        const { data } = await instance.post("/users/change-password", passwordData)
        toast.success(data?.message)
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error?.response?.data;
    }
}
