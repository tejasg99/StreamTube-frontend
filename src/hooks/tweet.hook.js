import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import {
    getUserTweets,
    createTweet,
    updateTweet, 
    deleteTweet
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