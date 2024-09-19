import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createPlaylist,
    updatePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    getPlaylistById,
    getUserPlaylists,
    deletePlaylist,
    checkVideoInPlaylist,
} from "../api/playlistAPI";

export const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (playlistData) => createPlaylist(playlistData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlists"]})
        }
    })
}

export const useUpdatePlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({playlistId, playlistData}) => updatePlaylist(playlistId, { playlistData }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlists"]})
        }
    })
}

export const useAddVideoToPlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({videoId, playlistId}) => addVideoToPlaylist(videoId, playlistId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlists"]})
        }
    })
}

export const useRemoveVideoFromPlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({videoId, playlistId}) => removeVideoFromPlaylist(videoId, playlistId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlists"]})
        }
    })
}

export const useGetPlaylistById = (playlistId) => {
    return useQuery({
        queryKey: ["playlist", playlistId],
        queryFn: () => getPlaylistById(playlistId),
        staleTime: 1000*60*4,
    })
}

export const useGetUserPlaylists = (userId) => {
    return useQuery({
        queryKey: ["playlists", userId],
        queryFn: () => getUserPlaylists(userId),
        staleTime: 1000*60*4,
    })
}

export const useDeletePlaylist = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (playlistId) => deletePlaylist(playlistId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlists"]})
        }
    })
}

export const useCheckVideoInPlaylist = (videoId, playlistId) => {
    return useQuery({
        queryKey: ["check-video", videoId, playlistId],
        queryFn: () => checkVideoInPlaylist(videoId, playlistId),
        staleTime: 1000*60*4,
    })
}