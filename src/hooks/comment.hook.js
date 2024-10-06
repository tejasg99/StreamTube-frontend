import { useQueryClient, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { 
    getVideoComments,
    addComment,
    updateComment,
    deleteComment 
} from "../api/commentAPI";

export const useGetVideoComments = (videoId, authenticated) => {
    return useInfiniteQuery({
        queryKey: ["comments", videoId],
        queryFn: ({pageParam = 1}) => getVideoComments(videoId, pageParam, authenticated),
        getNextPageParam: (lastPage) => {
            if(lastPage.hasNextPage === false) return;
            return lastPage.nextPage;
        },
        staleTime: 1000*60*2, 
    })
}

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ videoId, comment}) => addComment(videoId, {content: comment}),
        onSuccess: (data, videoId) => {
            queryClient.invalidateQueries({ queryKey: ["comments", videoId]})
        }
    })
}

export const useUpdateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({commentId, comment}) => updateComment(commentId, { content: comment}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"]})
        }
    })
}

export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (commentId) => deleteComment(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["comments"]})
        }
    }) 
}