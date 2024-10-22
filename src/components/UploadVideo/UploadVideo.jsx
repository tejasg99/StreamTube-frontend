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
    <div className="mt-16 mx-0 overflow-x-none sm:ml-8 absolute inset-0 z-10 bg-transparent px-2 w-3xl pb-[80px] pt-2 sm:px-14 sm:py-8">
      <div className="h-full overflow-y-auto border border-slate-500 bg-[#0e0e0e] scrollbar-hide">
        <div className="flex items-center justify-between border-b border-slate-500 p-4">
          <h2 className="text-xl font-semibold text-[#f1faee]">
            {isPending ? <span>Uploading your video...</span> : "Upload Video"}
          </h2>
          <div className="flex gap-4 items-center justify-center">
            <SpecialButton
              onClick={handleReset}
              className="bg-blue-600 text-[#f1faee] hover:bg-blue-500"
            >
              Reset
            </SpecialButton>
            <button onClick={handleClose}>
              <IoIosCloseCircleOutline className="w-8 h-8 text-[#f1faee] hover:text-[#6b219f]" />
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
