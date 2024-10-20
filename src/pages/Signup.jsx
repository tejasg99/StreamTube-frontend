import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogin, useRegister } from "../hooks/auth.hook";
import { setUser } from "../features/authSlice";
import { Logo, Input, SpecialButton } from "../components/index.js";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutateAsync: registerUser } = useRegister();
  const { mutateAsync: loginUser } = useLogin();

  const schema = z.object({
    email: z.string().email(),
    username: z
      .string()
      .min(4)
      .refine((value) => !value.includes(" "), {
        message: "Username must not contain empty spaces",
      })
      .refine((value) => value === value.toLowerCase(), {
        message: "Username must be in lowercase",
      }),
    fullname: z.string().min(4),
    password: z.string().min(6),
    avatar: z.instanceof(FileList).refine((files) => files.length === 1, {
      message: "Avatar is required",
    }),
    coverImage: z.instanceof(FileList).refine((files) => files.length === 1, {
      message: "CoverImage is required",
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const createAccount = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("fullname", data.fullname);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar[0]);
    formData.append("coverImage", data.coverImage[0]);

    try {
      const registeredUser = await registerUser(formData);
      if (registeredUser) {
        const loggedInUser = await loginUser({
          usernameOrEmail: data.email,
          password: data.password,
        });
        if (loggedInUser) {
          dispatch(setUser(loggedInUser));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Signup failed due to: ", error);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#0e0e0e] text-white flex justify-center items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_50%,#6b219f_100%)]">
      <div className="mx-auto my-8 flex w-full max-w-sm flex-col p-4 border border-slate-500 rounded-lg">
        <div className="w-full flex justify-center items-center">
          <Logo
            inline={true}
            className={"w-full text-center text-2xl font-semibold"}
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center mb-6">
          <h1 className="text-2xl">Signup</h1>
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 inline">
              Login
            </Link>
          </span>
        </div>

        <form onSubmit={handleSubmit(createAccount)} className="flex flex-col">
          <Input
            label={"Email*"}
            type="email"
            placeholder="Your email"
            id={"email"}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <Input
            label={"Username*"}
            type="text"
            placeholder="Your Username"
            id={"username"}
            {...register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}

          <Input
            label={"Full Name*"}
            type="text"
            placeholder="Your full name"
            id={"fullname"}
            {...register("fullname", { required: true })}
          />
          {errors.fullname && (
            <span className="text-red-500 text-sm">
              {errors.fullname.message}
            </span>
          )}

          <Input
            label={"Password*"}
            type="password"
            placeholder="*******"
            id={"password"}
            {...register("password", { required: true })}
            className="mb-4"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Profile Picture/Avatar*
            </label>
            <input
              type="file"
              {...register("avatar", { required: true })}
              className="text-white mt-2"
            />
            {errors.avatar && (
              <span className="text-red-500 text-sm">
                {errors.avatar.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Cover Image*
            </label>
            <input
              type="file"
              {...register("coverImage", { required: true })}
              className="text-white mt-2"
            />
            {errors.coverImage && (
              <span className="text-red-500 text-sm">
                {errors.coverImage.message}
              </span>
            )}
          </div>
          <SpecialButton type="submit">
            {isSubmitting ? "Signing up" : "Sign up"}
          </SpecialButton>
        </form>
      </div>
    </div>
  );
}

export default Signup;
