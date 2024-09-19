import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useChangePassword } from "../../hooks/auth.hook";

const schema = z.object({
  oldPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  newPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

function EditChangePassword() {
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

//   const oldPassword = watch("oldPassword");
//   const newPassword = watch("newPassword");
//   const confirmPassword = watch("confirmPassword");

  const { mutateAsync: changePassword, isPending } = useChangePassword();

  const onSubmit = async (data) => {
    const { oldPassword, newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) {
      toast.error("New Password and confirm password do not match");
      return;
    }
    const submitData = {
      oldPassword,
      newPassword,
    };
    // console.log(submitData);
    const res = await changePassword(submitData);
    if (res) {
      reset();
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-y-4 py-4">
      <div className="w-full sm:w-1/2 lg:w-1/3">
        <h5 className="font-semibold">Change Password</h5>
        <p className="text-gray-300">
          Please enter your current password to change it
        </p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-2/3">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl">
          <div className="flex flex-wrap gap-y-4 p-4 bg-gray-900 rounded-2xl">
            <div className="w-full">
              <label htmlFor="oldPass" className="mb-1 inline-block">
                Current Password
              </label>
              <input
                type="text"
                className="w-full rounded-lg bg-gray-700 px-2 py-1.5"
                id="oldPass"
                placeholder="Current Password"
                {...register("oldPassword")}
              />
              {errors.oldPassword && (
                <p className="mt-0.5 text-sm text-red-500">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="newPass" className="mb-1 inline-block">
                New Password
              </label>
              <input
                type="text"
                className="w-full rounded-lg bg-gray-700 px-2 py-1.5"
                id="newPass"
                placeholder="New Password"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="mt-0.5 text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="confirmPass">Confirm Password</label>
              <input
                type="text"
                id="confirmPass"
                placeholder="Confirm Password"
                className="w-full rounded-lg bg-gray-700 px-2 py-1.5"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="mt-0.5 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end gap-4 p-4">
              <button 
              type="button"
              onClick={() => reset()}
              disabled={isPending}
              className="inline-block rounded bg-red-700 px-3 py-1.5 hover:bg-red-500"
              >
                Reset
              </button>
              <button 
              type="submit"
              disabled={isPending}
              className="inline-block hover:bg-green-500 bg-green-700 text-white rounded px-3 py-1.5"
              >
                Change Password
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditChangePassword;
