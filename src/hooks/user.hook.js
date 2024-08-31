import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getUserChannelProfile,
    getWatchHistory,
    updateAccountDetails,
    updateAvatar,
    updateCoverImage
} from "../api/userAPI";

export const useGetWatchHistory = () => {
    return useQuery({
        queryKey: ["watchHistory"],
        queryFn: () => getWatchHistory(),
        refetchOnWindowFocus: true, // to refetch data
    });
}

export const useGetUserChannelProfile = (username) => {
    return useQuery({
        queryKey: ["userChannelProfile", username],
        queryFn: () => getUserChannelProfile(username),
        refetchOnWindowFocus: true,
    });
}