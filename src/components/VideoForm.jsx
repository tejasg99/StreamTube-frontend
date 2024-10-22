import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropzone,
  TitleInput,
  DescriptionInput,
  SpecialButton,
  VideoPreviewCard,
} from "./index.js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const schema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(5, "Title must be longer than 5 characters"),
  description: z
    .string()
    .min(6, "Description must be longer than 6 characters"),
});

function VideoForm({
  resetStatus,
  isEditing = false,
  initialVideo,
  onSubmit,
  user,
  isPending,
}) {
  const [videoFile, setVideoFile] = useState(initialVideo?.videoFile || null);
  const [thumbnail, setThumbnail] = useState(
    initialVideo?.thumbnail || null
  );
  const [previewTitle, setPreviewTitle] = useState(initialVideo?.title || "");
  const [previewDescription, setPreviewDescription] = useState(
    initialVideo?.description || ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialVideo?.title || "",
      description: initialVideo?.description || "",
    },
  });

  const title = watch("title");
  const description = watch("description");

  const handleFormSubmit = async (data) => {
    console.log("handleFormSubmit has been called ", data);
    // if (!video || (!thumbnail && !isEditing)) {
    //   toast.error("Please upload both video and thumbnail");
    //   return;
    // }
    if (isEditing && !thumbnail) {
      toast.error("Please upload a thumbnail");
      return;
    }

    const formData = { ...data, videoFile, thumbnail };
    const res = await onSubmit(formData);
    if (res) onReset();
  };

  const onReset = () => {
    setVideoFile(null);
    setThumbnail(null);
    setPreviewTitle("");
    setPreviewDescription("");
    reset();
  };

  useEffect(() => {
    if (resetStatus) {
      onReset();
    }
    return () => {
      onReset();
    };
  }, [resetStatus]);

  const handleTitleBlur = (e) => {
    setPreviewTitle(e.target.value);
  };

  const handleDescriptionBlur = (e) => {
    setPreviewDescription(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="w-full flex justify-center items-center flex-col sm:flex-row">
        <div className="left-side flex sm:w-7/12 max-w-2xl flex-col gap-y-4 p-4 w-full">
          <div className="sm:h-[24rem]">
            <Dropzone
              file={isEditing ? thumbnail : videoFile}
              setFile={isEditing ? setThumbnail : setVideoFile}
              type={isEditing ? "image" : "video"}
              isPending={isPending}
            />
          </div>

          {isEditing && (
            <div className="w-full">
              <label htmlFor="thumbnail" className="mb-1 inline-block">
                Thumbnail<sup>*</sup>
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                disabled={isPending}
                className="w-full border p-1 file:mr-4 file:border-none file:bg-[#6b219f] file:px-3 file:py-1.5 file:text-white"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </div>
          )}

          {!isEditing && (
            <div className="w-full">
              <label htmlFor="thumbnail" className="mb-1 inline-block">
                Thumbnail<sup>*</sup>
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                disabled={isPending}
                className="w-full border p-1 file:mr-4 file:border-none file:bg-[#6b219f] file:px-3 file:py-1.5 file:text-white"
                onChange={(e) => setThumbnail(e.target.files[0])}
              />
            </div>
          )}

          <div className="w-full">
            <TitleInput
              disabled={isPending}
              {...register("title")}
              onBlur={handleTitleBlur}
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div className="w-full">
            <DescriptionInput
              disabled={isPending}
              {...register("description")}
              onBlur={handleDescriptionBlur}
            />
            {errors.title && (
              <span className="text-red-500">{errors.description?.message}</span>
            )}
          </div>
        </div>
        <div className="right-side h-full sm:w-4/12 p-4 w-full mb-[4rem]">
          <div className="flex flex-col w-full h-full gap-6">
            <h3 className="text-[1.2rem] text-white mx-auto font-extrabold">
              Your video will look something like this
            </h3>
            <VideoPreviewCard
              video={videoFile}
              thumbnail={thumbnail}
              title={previewTitle}
              description={previewDescription}
              channelName={user?.fullname}
            />
            <div className="text-center p-2 rounded">
              {isPending ? (
                <p className="text-lg font-bold mb-2">
                  <span className="rotate-animation">⌛</span> Uploading your
                  Video...
                </p>
              ) : (
                <>
                  <p className="text-lg mb-2">
                    Looks Great😍 right? Click 👇
                  </p>
                  <SpecialButton
                    type="submit"
                    disabled={isPending}
                    className="min-w-[8rem]"
                  >
                    {isEditing ? "Update" : "Upload"}
                  </SpecialButton>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

VideoForm.propTypes = {
    resetStatus: PropTypes.bool,
    isEditing: PropTypes.bool,
    initialVideo: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        video: PropTypes.shape({
            url: PropTypes.string,
        }),
        thumbnail: PropTypes.shape({
            url: PropTypes.string,
        }),
    }),
    onSubmit: PropTypes.func,
    user: PropTypes.shape({
        fullname: PropTypes.string,
    }),
    isPending: PropTypes.bool,
}

export default VideoForm;
