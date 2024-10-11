import { useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
    getUserTweets,
    createTweet,
    updateTweet, 
    deleteTweet,
    getAllTweets,
} from "../api/tweetAPI"

export const useCreateTweet = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({tweetContent}) => createTweet({ content: tweetContent}),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["tweets"]})
        }
    })
}

export const useUpdateTweet = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({tweetId, tweetContent}) => updateTweet(tweetId, {content: tweetContent}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tweets"]})
        }
    })
}

export const useDeleteTweet = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (tweetId) => deleteTweet(tweetId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tweets"]})
        }
    })
}

export const useGetUserTweets = (userId) => {
    return useInfiniteQuery({
        queryKey: ["tweets", userId],
        queryFn: ({pageParam = 1}) => {
            if(userId === null || userId === undefined){
                return Promise.resolve({ docs: [], hasNextPage: false});
            }
            return getUserTweets({pageParam, userId})
        },
        getNextPageParam: (lastPage) => {
            if(lastPage.hasNextPage) {
                return lastPage.nextPage;
            }
            return undefined;
        },
        staleTime: 1000*60*5,
        retry: 2,
        enabled: !!userId, 
    })
}

export const useGetAllTweets = (authenticated) => {
    return useInfiniteQuery({
        queryKey: ["tweets"],
        queryFn: ({pageParam = 1}) => getAllTweets({pageParam, authenticated}),
        getNextPageParam: (lastPage) => {
            if(lastPage.hasNextPage) {
                return lastPage.nextPage;
            }
            return undefined;
        },
        staleTime: 1000*60*5,
        retry: 2, 
    })
}