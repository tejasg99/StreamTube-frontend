import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useUpdateAccountDetails } from "../../hooks/user.hook";
import { ProgressBar } from "../../components/index";

const schema = z.object({
  fullname: z
    .string()
    .min(1, "Full name cannot be empty")
    .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters" }),
  email: z.string().email({ message: "Invalid email address" }),
});

function EditAccountDetails() {
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: user?.fullname,
      email: user?.email,
    },
  });

  const { mutateAsync: updateAccount, isPending } = useUpdateAccountDetails();

  const onSubmit = async (data) => {
    const { fullname, email } = data;

    const initialData = {
      fullname: user?.fullname,
      email: user?.email,
    };

    const hasDataChanged =
      fullname !== initialData.fullname || email !== initialData.email;
    if (!hasDataChanged) {
      return;
    }

    const submitData = { fullname, email };
    await updateAccount(submitData);
  };

  return (
    <div className="flex flex-wrap justify-between py-4">
      {isPending && <ProgressBar />}
      <div className="w-full sm:w-1/2 lg:w-1/3 mb-2">
        <h5 className="font-semibold">Account Details</h5>
        <p className="text-gray-300">Update your account details.</p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-2/3">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl">
          <div className="flex flex-wrap gap-y-4 p-4 bg-black rounded-2xl">
            <div className="w-full">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                className="w-full rounded-lg bg-slate-900 px-2 py-1.5"
                placeholder="Enter full name"
                {...register("fullname")}
              />
              {errors.fullname && (
                <p className="text-red-500">{errors.fullname.message}</p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="email" className="mb-1 inline-block">
                Email address
              </label>
              <input
                type="text"
                className="w-full rounded-lg bg-slate-900 px-2 py-1.5"
                id="email"
                placeholder="Enter email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
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
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAccountDetails;
