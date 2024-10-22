import { BsCardImage } from "react-icons/bs";

export default function VideoPreviewCard({
  video,
  thumbnail,
  title,
  description,
  channelName,
}) {
  // Check for the url string for thumbnail and video
  const thumbnailSrc =
    thumbnail instanceof File ? URL.createObjectURL(thumbnail) : thumbnail;
  const videoSrc = video instanceof File ? URL.createObjectURL(video) : video;

  return (
    <div className="w-full bg-slate-950 rounded-lg shadow-md overflow-hidden text-white  border-2 border-dotted border-slate-500">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          {thumbnailSrc && videoSrc ? (
            <img
              src={thumbnailSrc}
              alt="thumbnail-card"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center">
              <BsCardImage className="w-full h-full text-slate-50" />
              <p className="mt-2 px-4">
                Please upload both Video and Thumbnail to see Preview
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
          <h6 className="mb-2 font-semibold text-lg">{title || "Video Title"}</h6>
          <p className="text-sm text-gray-300 mb-2">
            {description && description.length > 250 ? `${description.substring(0, 250)}...` : description || "Video Description..."}
          </p>
          <p className="text-sm text-gray-500">By {channelName}</p>
      </div>
    </div>
  );
}
