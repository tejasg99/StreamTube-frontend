import { forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import VideoPlayer from "./VideoPlayer";
import { AiOutlineCloudUpload } from "react-icons/ai";
import formatBytes from "../assets/formatBytes";

const Dropzone = forwardRef(({ type, setFile, file, isPending }, ref) => {
  const fileTypes = {
    video: {
      "video/*": [".mp4", ".mov", ".avi", ".flv", ".wmv", ".mkv"],
    },
    image: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
  };

  const { getRootProps, isDragReject, getInputProps, open } = useDropzone({
    accept: fileTypes[type],
    onDrop: (acceptedFiles) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          url: URL.createObjectURL(acceptedFiles[0]),
        })
      );
    },
    multiple: false,
    noClick: true, //disables file selection by click
    noKeyboard: true,
  });
  const isImage = type === "image";
  const isVideo = type === "video";

  let fileSource;
  if (typeof file === "string") {
    fileSource = file;
  } else if (file && file.url) {
    fileSource = file.url;
  }

  if (file) {
    return (
      <div className="w-full h-full border-2 border-dashed px-4 py-2 text-center">
        <div className="h-[19rem] w-full mx-auto">
          {isImage && (
            <img src={fileSource} alt="Preview" className="w-full h-full" />
          )}
          {isVideo && (
            <VideoPlayer
              src={{
                src: file.url,
                type: "video/mp4",
              }}
              autoPlay={false}
            />
          )}
        </div>

        <div className="mt-2 flex justify-center items-center gap-2 w-full">
          {!(typeof file === "string") && (
            <>
              <h6 className="font-semibold w-6/12">{file.name}</h6>
              <p className="text-gray-400 w-2/12">{formatBytes(file.size)}</p>
            </>
          )}
          <button
            type="button"
            className="px-6 py-3 w-4/12 border-none bg-blue-500 text-black hover:bg-blue-400"
            onClick={() => setFile(null)}
            disabled={isPending}
          >
            Select another {type}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className="w-full h-full border-2 border-dashed px-2 py-8 text-center"
    >
      <input ref={ref} className="sr-only" {...getInputProps()} />
      <span className="mb-4 inline-block w-24 rounded-full bg-[#6b219f] p-4 text-white">
        <AiOutlineCloudUpload className="w-full h-full" />
      </span>
      <h6 className="mb-2 font-semibold">
        Drag and drop {type} files to upload
      </h6>
      <p className="text-gray-400 ">
        {type === "video" ? "MP4, MOV, AVI, FLV, WMV, MKV" : "JPG, JPEG, PNG"}
      </p>
      {isDragReject && (
        <h6 className="mb-2 font-semibold">Only {type} files are allowed</h6>
      )}
      <label
        onClick={open}
        className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#6b219f] px-3 py-2 text-center font-bold text-white shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
      >
        Select Files
      </label>
    </div>
  );
});

Dropzone.displayName = "DropZone";

export default Dropzone;
