import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    toggleSubscription,
    getChannelSubscribers,
    getSubscribedChannels
} from "../api/subscriptionAPI";

export const useToggleSubscription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (channelId) => toggleSubscription(channelId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["subscribedChannels"]});
            queryClient.invalidateQueries({queryKey: ["channelSubscribers"]});
            queryClient.invalidateQueries({queryKey: ["video"]});
        }
    })
}