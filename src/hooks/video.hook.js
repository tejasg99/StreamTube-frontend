import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import {
    publishVideo,
    getVideoById,
    getAllVideos,
    updateVideo,
    deleteVideo,
    togglePublishStatus
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
