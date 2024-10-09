import { formatDuration, timeAgo } from "../../assets/timeAgo";
import PropTypes from "prop-types";

function VideoListCard({ video, owner }) {
  return (
    <>
      {video && (
        <div className="w-full max-w-3xl gap-x-4 md:flex">
          <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
            <div className="w-full pt-[56%]">
              <div className="absolute inset-0">
                <img
                  src={video?.thumbnail}
                  alt={video?.title}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                {formatDuration(video?.duration)}
              </span>
            </div>
          </div>
          <div className="flex gap-x-2 md:w-7/12">
            <div className="h-10 w-10 shrink-0 md:hidden">
              <img
                src={video?.ownerDetails?.avatar || owner?.avatar}
                alt={video?.ownerDetails?.username || owner?.username}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="w-full flex flex-col justify-between">
              <div className="">
                <h5 className="mb-1 font-semibold md:max-w-[75%]">
                  {video?.title}
                </h5>
                <p className="mt-2 hidden text-sm md:block text-gray-100">
                  {video?.description?.length > 100
                    ? video?.description.slice(0, 100) + "..."
                    : video?.description}
                </p>
                <p className="flex text-xs text-gray-200 sm:mt-3 items-center">
                    {video?.views} Views · {timeAgo(video?.createdAt)}
                </p>                 
              </div>
                <div className="flex items-center gap-x-4">
                  <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
                    <img
                      src={video?.ownerDetails?.avatar|| owner?.avatar}
                      alt={video?.ownerDetails?.username || owner?.username}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-200">
                    {video?.ownerDetails?.username || owner?.username}
                  </p>                  
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

VideoListCard.propTypes = {
    video: PropTypes.string,
    owner: PropTypes.string,
}

export default VideoListCard;
