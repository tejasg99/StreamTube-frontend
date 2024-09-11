import { useState, useMemo } from "react";
import { useGetchannelVideos } from "../hooks/dashboard.hook";
import { useDeleteVideo, useTogglePublishStatus } from "../hooks/video.hook";
import { MdModeEditOutline, MdDelete, MdSearch } from "react-icons/md";
import { setShowEditVideo } from "../features/uiSlice";
import { setVideoForEditing } from "../features/videoSlice";
import { useDispatch } from "react-redux";
import DeletePopup from "./DeletePopup";

function VideoStats() {
  const dispatch = useDispatch();
  const [deletePopupId, setDeletePopupId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: channelVideos, isFetching } = useGetchannelVideos();
  const { mutateAsync: toggleVideoPublishStatus } = useTogglePublishStatus();
  const { mutateAsync: deleteVideo, isPending: isDeleting } = useDeleteVideo();

  const togglePublishStatus = async (videoId) => {
    await toggleVideoPublishStatus(videoId);
  };

  const handleDelete = (videoId) => {
    setDeletePopupId(videoId);
  };

  const deleteConfirm = async (videoId) => {
    await deleteVideo(videoId);
    setDeletePopupId(null);
  };

  const handleEdit = (video) => {
    dispatch(setVideoForEditing(video));
    dispatch(setShowEditVideo(true));
  };

  const filteredVideos = useMemo(() => {
    return channelVideos?.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [channelVideos, searchTerm]);

  return (
    <>
      <div className="relative">
        <input
          className="w-full peer border-2  focus:border-white bg-transparent py-2 pl-10 pr-4 rounded-md placeholder-gray-400 outline-none transition-all duration-300 focus:shadow-lg"
          placeholder="Search videos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MdSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-white"
          size={20}
        />
      </div>
      <div className="overflow-x-auto rounded-lg md:block hidden">
        <table className="w-full min-w-[1200px] text-white">
          <thead>
            <tr>
              <th className="p-4">Status</th>
              <th className="p-4">Publish</th>
              <th className="p-4">Uploaded</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Date uploaded</th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos &&
              filteredVideos.map((video, index) => {
                <tr
                  key={video._id}
                  className={`group ${
                    index % 2 === 0 ? "bg-[#131313]" : "bg-[#0e0e0e]"
                  }`}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex justify-center">
                      <label className="relative inline-block w-12 cursor-pointer">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={video?.isPublished}
                          onChange={() => togglePublishStatus(video._id)}
                        />
                        <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-green-300 peer-checked:after:left-7"></span>
                      </label>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex justify-center">
                      <span
                        className={`inline-block rounded-2xl border px-1.5 py-0.5 ${
                          video?.isPublished
                            ? "border-green-600 text-green-600"
                            : "border-red-600 text-red-600"
                        }`}
                      >
                        {video?.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      {deletePopupId === video._id && (
                        <DeletePopup
                          onDeleteConfirm={() => deleteConfirm(video._id)}
                          onCancel={() => setDeletePopupId(null)}
                          isDeleting={isDeleting}
                          type={"Video"}
                        />
                      )}
                      <img
                        className="h-10 w-14 rounded-md object-cover"
                        src={video?.thumbnail.url}
                        alt={video?.title}
                      />
                      <h3 className="font-semibold text-center">
                        {video?.title}
                      </h3>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex justify-center gap-4">
                      <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                        {video?.likesCount} likes
                      </span>
                    </div>
                  </td>
                  <td className="text-center px-4 py-3 whitespace-nowrap">
                    {new Date(video?.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(video)}
                        className="h-5 w-5 hover:text-blue-500"
                      >
                        <MdModeEditOutline className="w-6 h-6" />
                      </button>
                      <button
                        className="h-5 w-5 hover:text-red-500"
                        onClick={() => handleDelete(video._id)}
                      >
                        <MdDelete className="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>;
              })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden flex flex-wrap justify-between text-white">
        {filteredVideos &&
          filteredVideos.map((video, index) => (
            <div
              key={video._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <div
                className={`flex flex-col rounded-lg shadow-md overflow-hidden ${
                  index % 2 === 0 ? "bg-[#0e0e0e]" : "bg-[#151515]"
                }`}
              >
                <div className="p-4 gap-3 flex flex-col">
                  {deletePopupId === video._id && (
                    <DeletePopup
                      onDeleteConfirm={() => deleteConfirm(video._id)}
                      onCancel={() => setDeletePopupId(null)}
                      isDeleting={isDeleting}
                      type={"Video"}
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <img
                        className="h-10 w-14 rounded-md object-cover"
                        src={video?.thumbnail.url}
                        alt={video?.title}
                      />
                      <h3 className="font-semibold">{video?.title}</h3>
                    </div>
                    <label className="relative inline-block w-12 cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={video?.isPublished}
                        onChange={() => togglePublishStatus(video._id)}
                      />
                      <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#ae7aff] peer-checked:after:left-7"></span>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <span
                      className={`inline-block rounded-2xl border px-1.5 py-0.5 ${
                        video?.isPublished
                          ? "border-green-600 text-green-600"
                          : "border-orange-600 text-orange-600"
                      }`}
                    >
                      {video?.isPublished ? "Published" : "Unpublished"}
                    </span>
                    <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                      {video?.likesCount} likes
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>
                      Uploaded on{" "}
                      {new Date(video?.createdAt).toLocaleDateString("en-GB")}
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(video)}
                        className="h-5 w-5 hover:text-blue-500"
                      >
                        <MdModeEditOutline className="w-6 h-6" />
                      </button>
                      <button
                        className="h-5 w-5 hover:text-red-500"
                        onClick={() => handleDelete(video)}
                      >
                        <MdDelete className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className="mb-[14rem]"></div>
      </div>
    </>
  );
}

export default VideoStats;
