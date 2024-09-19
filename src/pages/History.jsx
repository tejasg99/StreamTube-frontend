import { useState } from "react";
import { useGetWatchHistory, useClearWatchHistory } from "../hooks/user.hook";
import { VideoListCard, VideoListCardSkeleton } from "../components/index";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: watchHistory, isLoading } = useGetWatchHistory();
  const { mutateAsync: clearUserWatchHistory } = useClearWatchHistory();

  const filteredHistory = watchHistory?.filter((video) =>
    video.video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearWatchHistory = async () => {
    await clearUserWatchHistory();
  };

  if (isLoading) {
    return (
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="flex flex-col gap-4 p-4">
          {Array(5)
            .fill()
            .map((_, index) => (
              <VideoListCardSkeleton key={index} />
            ))}
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <section className="w-3/4 pr-4">
        <h1 className="text-3xl font-bold my-2 ml-4">Watch History</h1>
        <div className="flex flex-col gap-4 p-4">
          {filteredHistory &&
            filteredHistory.map((video) => (
              <Link to={`/videos/${video?.video?._id}`} key={video?.video?._id}>
                <VideoListCard video={video.video} />
              </Link>
            ))}
        </div>
      </section>

      <aside className="w-full sm:w-1/4 p-4">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search videos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 text-white border border-blue-500 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <BiSearch className="absolute h-6 w-6 left-3 top-2.5 text-blue-400" />
        </div>

        <button
          onClick={clearWatchHistory}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Clear Watch History
        </button>
      </aside>
    </div>
  );
}

export default History;
