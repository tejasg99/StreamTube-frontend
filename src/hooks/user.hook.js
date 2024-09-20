import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getUserChannelProfile,
    getWatchHistory,
    updateAccountDetails,
    updateAvatar,
    updateCoverImage,
    clearWatchHistory,
    updateChannelDesc,
} from "../api/userAPI";

export const useGetWatchHistory = () => {
    return useQuery({
        queryKey: ["watchHistory"],
        queryFn: () => getWatchHistory(),
        refetchOnWindowFocus: true, // to refetch data
    });
}

export const useGetUserChannelInformation = (username) => {
    return useQuery({
        queryKey: ["channelInfo", username],
        queryFn: () => getUserChannelProfile(username),
        refetchOnWindowFocus: true,
    });
}

export const useUpdateAccountDetails = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updateData) => updateAccountDetails(updateData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["channelInfo"]});
            queryClient.invalidateQueries({ queryKey: ["currentUser"]});
        },
    });
}

export const useUpdateChannelDesc = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updateDesc) => updateChannelDesc(updateDesc),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["channelInfo"]});
            queryClient.invalidateQueries({ queryKey: ["currentUser"]});
        }
    })
}

export const useUpdateAvatar = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (avatarData) => updateAvatar(avatarData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["channelInfo"]});
        }
    })
}

export const useUpdateCoverImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (coverImageData) => updateCoverImage(coverImageData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["channelInfo"]});
        }
    })
}

export const useClearWatchHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => clearWatchHistory(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["watchHistory"] });
        }
    })
}