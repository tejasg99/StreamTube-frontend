import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
import { useUpdateChannelDesc } from "../hooks/user.hook";

const schema = z.object({
  description: z
    .string()
    .max(275, { message: "Description must be less than 275 characters" }),
});

function UpdateDescriptionPopup({ onClose,}) {
  const channel = useSelector((state) => state.channel.channel);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { description: channel?.description || "" },
    mode: "onChange",
  });

  const description = watch("description");
  const maxChars = 275;

  const descriptionCharsLeft = maxChars - description.length;

  const { mutateAsync: updateChannelDescription, isPending } = useUpdateChannelDesc();

  const onSubmit = async (data) => {
    const { description } = data;

    const initialData = {
        description: channel?.description,
    }

    const hasDataChanged = description !== initialData.description;

    if(!hasDataChanged) { return; }

    await updateChannelDescription(data);
  }

  return (
    <>
      <div className="fixed inset-0  flex justify-center items-center bg-black bg-opacity-75 z-50">
        <div className="bg-black border border-slate-500 rounded-lg p-5 text-white text-center w-1/3 h-fit sm:w-auto">
          {isPending && <ProgressBar />}
          <div className="flex w-full justify-between items-center gap-2">
          <h1 className="text-xl font-bold mb-4">
            Update Channel Description
          </h1>            
          <button
            onClick={onClose}
            type="button"
            className="h-6 w-6 flex justify-center items-center rounded-full bg-white p-2 text-black text-xl"
          >
            &times;
          </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="mb-1 inline-block" htmlFor="desc">
              Description
            </label>
            <textarea
              className="w-full rounded-lg bg-slate-800 px-2 py-1.5 text-white"
              rows="4"
              id="desc"
              placeholder="Channel Description"
              {...register("description")}
            ></textarea>
            <p className="mt-0.5 text-sm text-gray-300">
              {descriptionCharsLeft} characters left
            </p>
            {errors.description && (
              <p className="text-md text-red-500">
                {errors.description.message}
              </p>
            )}

            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={() => reset()}
                disabled={isPending}
                className="bg-blue-500 text-white w-24 py-1 px-2 font-semibold text-lg rounded"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="bg-slate-800 text-white w-24 py-1 px-2 font-semibol text-lg rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateDescriptionPopup;
