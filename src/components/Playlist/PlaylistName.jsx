import { useState } from "react";
import {
  useAddVideoToPlaylist,
  useRemoveVideoFromPlaylist,
  useCheckVideoInPlaylist
} from "../../hooks/playlist.hook";

function PlaylistName({ playlistId, videoId, playlistName }) {
  const {data: isAdded} = useCheckVideoInPlaylist(videoId, playlistId);
  const [added, setAdded] = useState(isAdded || false);
  const { mutateAsync: addVideoToPlaylist } = useAddVideoToPlaylist();
  const { mutateAsync: removeVideoFromPlaylist } = useRemoveVideoFromPlaylist();

  const handleAddVideo = async () => {
    await addVideoToPlaylist({ videoId, playlistId });
  };

  const handleRemoveVideo = async () => {
    await removeVideoFromPlaylist({ videoId, playlistId });
  };

  return (
    <li key={playlistId} className="mb-2 last:mb-0">
      <label
        className="group/label inline-flex cursor-pointer items-center gap-x-3"
        htmlFor={`${playlistId}-checkbox`}
      >
        <input
          type="checkbox"
          className="peer hidden"
          id={`${playlistId}-checkbox`}
          defaultChecked={added}
          onChange={(e) => {
            if (e.target.checked) {
              setAdded(true);
              handleAddVideo();
            } else {
              setAdded(false);
              handleRemoveVideo();
            }
          }}
        />
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-blue-500 peer-checked:border-blue-700 peer-checked:text-blue-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            ></path>
          </svg>
        </span>
        {playlistName}
      </label>
    </li>
  );
}

export default PlaylistName;
