import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import {
    publishVideo,
    getVideoById,
    getAllVideos,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
    getNextVideos,
} from "../api/videoAPI";

export const useAllVideos = (options = {}) => {
    const {userId, sortBy, sortType, query} = options;
    return useInfiniteQuery({
        queryKey: ["videos", {userId, sortBy, sortType, query}],
        queryFn: async ({pageParam = 1}) => {
            const response = await getAllVideos(
                pageParam,
                userId,
                sortBy,
                sortType,
                query,
            );
            console.log("useAllVideos API response: ", response)
            return response;
        },
        getNextPageParam: (lastPage) => {
            if(lastPage.hasNextPage === false) return;
            return lastPage.nextPage;
        },
        staleTime: 1000*60*5,
    });
}

export const useGetVideoById = (videoId) => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["video", videoId],
        queryFn: () => getVideoById(videoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["watchHistory"]})
        },
        staleTime: 1000*60*2,
    })
}

export const usePublishVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => publishVideo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["channelStats"],
            });
            queryClient.invalidateQueries({ queryKey: ["channelVideos"] })
        }
    })
}

export const useTogglePublishStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (videoId) => togglePublishStatus(videoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["videos"]})
            queryClient.invalidateQueries({ queryKey: ["channelVideos"]})
        },
    });
}

export const useUpdateVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({videoId, data}) => updateVideo(videoId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["videos"]})
            queryClient.invalidateQueries({ queryKey: ["channelVideos"]})
        },
    });
}

export const useDeleteVideo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (videoId) => deleteVideo(videoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["videos"]})
            queryClient.invalidateQueries({ queryKey: ["channelVideos"]})
            queryClient.invalidateQueries({ queryKey: ["channelStats"]})
        },
    });
}

export const useNextVideos = (videoId) => {
    return useQuery({
        queryKey: ["nextVideos", videoId],
        queryFn: () => getNextVideos(videoId),
        staleTime: 1000 * 60 * 3,
    });
}