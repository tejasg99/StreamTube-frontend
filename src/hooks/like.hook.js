import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
} from "../api/likeAPI"

export const useToggleLike = (type) => {
    const queryClient = useQueryClient();
    if(type === "video"){
        return useMutation({
            mutationFn: (videoId) => toggleVideoLike(videoId),
            onSuccess: (data, videoId) => {
                queryClient.invalidateQueries({ queryKey: ["video", videoId]})
            },
        })
    }
    
    if(type === "comment"){
        return useMutation({
            mutationFn: (commentId) => toggleCommentLike(commentId),
            onSuccess: (data, commentId) => {
                queryClient.invalidateQueries({ queryKey: ["comment", commentId]})
            }
        })
    }

    if(type === "tweet"){
        return useMutation({
            mutationFn: (tweetId) => toggleTweetLike(tweetId),
            onSuccess: (data, tweetId) => {
                queryClient.invalidateQueries({ queryKey: ["tweet", tweetId]})
            }
        })
    }
}