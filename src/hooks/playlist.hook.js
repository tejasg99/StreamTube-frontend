import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createPlaylist,
    updatePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    getPlaylistById,
    getUserPlaylists,
    deletePlaylist
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