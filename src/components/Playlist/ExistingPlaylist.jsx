import { useSelector } from "react-redux";
import { useGetUserPlaylists } from "../../hooks/playlist.hook";
import { PlaylistName, ProgressBar } from "../index";

function ExistingPlaylist({ videoId }) {
  const userId = useSelector((state) => state.auth.user?._id);

  const {
    data: existingPlaylists,
    isFetched,
    isRefetching,
  } = useGetUserPlaylists(userId);

  if (isRefetching && !isFetched) {
    return <ProgressBar />;
  }

  return (
    <ul className="mb-4">
      {isFetched && existingPlaylists?.length > 0 ? (
        existingPlaylists.map((playlist) => (
          <PlaylistName
            key={playlist._id}
            playlistId={playlist._id}
            videoId={videoId}
            playlistName={playlist?.name}
          />
        ))
      ) : (
        <p>No Playlists found</p>
      )}
    </ul>
  );
}

export default ExistingPlaylist;
