import { useQuery } from "@tanstack/react-query";
import {
    getChannelStats,
    getChannelVideos
} from "../api/dashboardAPI";

export const useGetChannelStats = (channelId) => {
    return useQuery({
        queryKey: ["channelStats", channelId],
        queryFn: () => getChannelStats(channelId)
    })
}

export const useGetchannelVideos = (channelId) => {
    return useQuery({
        queryKey: ["channelVideos", channelId],
        queryFn: () => getChannelVideos(channelId)
    })
}