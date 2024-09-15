import { useState } from "react";
// import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers";
import { usePublishVideo } from "../../hooks/video.hook";
import { SpecialButton, ProgressBar, VideoForm } from "../index";
import toast from "react-hot-toast";
import { setShowUploadVideo } from "../../features/uiSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";

function UploadVideo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [resetStatus, setResetStatus] = useState(false);
  const { mutateAsync: uploadVideo, isPending } = usePublishVideo();

  const onSave = async (data) => {
    const res = await uploadVideo(data);
    if (res) {
      dispatch(setShowUploadVideo(false));
    }
    return res;
  };

  const handleClose = () => {
    if (isPending) {
      toast("Video is still uploading Please wait", {
        icon: "⌛",
      });
      return;
    }
    dispatch(setShowUploadVideo(false));
  };

  const handleReset = () => {
    if (isPending) {
      toast("Video is still uploading Please wait", {
        icon: "⌛",
      });
      return;
    }
    setResetStatus((prev) => !prev);
  };

  return (
    <div className="mt-16 ml-0 overflow-x-hidden sm:ml-8 absolute inset-0 z-10 bg-black/50 px-4 w-full pb-[80px] pt-4 sm:px-14 sm:py-8">
      <div className="h-full overflow-auto border bg-[#0e0e0e]">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold text-[#f1faee]">
            {isPending ? <span>Uploading your video...</span> : "Upload Video"}
          </h2>
          <div className="flex gap-4 items-center justify-center">
            <SpecialButton
              onClick={handleReset}
              className="bg-blue-500 text-[#f1faee] hover:bg-blue-400"
            >
              Reset
            </SpecialButton>
            <button onClick={handleClose}>
              <IoIosCloseCircleOutline className="w-8 h-8 text-[#f1faee] hover:text-blue-500" />
            </button>
          </div>
        </div>
        {isPending && <ProgressBar />}
        <VideoForm
          onSubmit={onSave}
          user={user}
          resetStatus={resetStatus}
          isPending={isPending}
        />
      </div>
    </div>
  );
}

export default UploadVideo;