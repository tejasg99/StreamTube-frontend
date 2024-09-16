import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ExistingPlaylist, PlayListForm, LoginPopup } from "../index";
import {
  useAddVideoToPlaylist,
  useCreatePlaylist,
} from "../../hooks/playlist.hook";

function PlaylistDropdown({ videoId }) {
  const userId = useSelector((state) => state.auth.user?._id);
  const authStatus = useSelector((state) => state.auth.authStatus);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const dropdownRef = useRef(null);
  const { mutateAsync: createPlaylist } = useCreatePlaylist(userId);
  const { mutateAsync: addVideoToPlaylist } = useAddVideoToPlaylist(userId);

  const handleDropdown = (e) => {
    e.stopPropagation();
    if (!authStatus) {
      setShowLoginPopup(true);
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    if (!name) {
      toast.error("Name is required");
    }
    const res = await createPlaylist({ name });
    if (res) {
      setShowDropdown(false);
      addVideoToPlaylist({ videoId, playlistId: res._id });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      //Close dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  if (showLoginPopup) {
    <LoginPopup
      onClose={() => setShowLoginPopup(false)}
      loginTo={"Add video to Playlist"}
    />;
  }

  return (
    <>
      <div className="relative block" ref={dropdownRef}>
        <button
          onClick={(e) => handleDropdown(e)}
          className="flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black"
        >
          <span className="inline-block w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              ></path>
            </svg>
          </span>
          Save
        </button>
        {showDropdown && (
          <div className="absolute right-0 top-full z-10  w-64 overflow-hidden rounded-lg bg-[#0e0e0e] p-4 shadow shadow-slate-50/30">
            <h3 className="mb-4 text-center text-lg font-semibold">
              Add to Playlist
            </h3>
            <ExistingPlaylist videoId={videoId} />
            <form onSubmit={(e) => onSubmit(e)} className="flex flex-col">
              <label
                htmlFor="playlist-name"
                className="mb-1 inline-block cursor-pointer"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="playlist-name"
                placeholder="Enter playlist name"
                required
                className="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="mx-auto mt-4 rounded-lg bg-blue-400 px-4 py-2 text-black"
              >
                Create new playlist
              </button>
            </form>
          </div>
        )}
        {showCreatePlaylist && <PlayListForm onClose={createPlaylist} />}
      </div>
    </>
  );
}

export default PlaylistDropdown;
