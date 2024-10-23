import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/auth.hook";
import { Input, SpecialButton} from "./index.js";
import PropTypes from "prop-types";

function LoginForm({ onLogin }) {
    //Zod schema object
    const schema = z.object( 
        {
            usernameOrEmail: z
            .string()
            .min(3, "Username or email must be at least 3 characters long"),
            password: z.string().min(6, "Password must be at least 6 characters long"),
        }
    );

    //React Hook form intialization
    const { register, handleSubmit, formState: {errors} } = useForm({ resolver: zodResolver(schema)})

    //Login hook 
    const { mutateAsync: login, isPending } = useLogin();

    const loginUser = async (data) => {
        // console.log("Login attempt with data: ", data)

        try {
            const session = await login(data);
            // console.log("Login successful, session data: ", session)
            if(session) {
                onLogin(session);
            }
        } catch (error) {
            console.error("Failed to login: ", error)
        }
    };

    return (
        <form 
            onSubmit={handleSubmit(loginUser)}
            className="flex flex-col text-white"
        >
            <Input 
                className = "text-white"
                label = {"Username/Email *"}
                type = "text"
                placeholder = "Username/Email"
                id = {"username"}
                {...register("usernameOrEmail", { required: true })}
            />
            {errors.usernameOrEmail && (
                <span className="text-red-500 text-sm">
                    {errors.usernameOrEmail.message}
                </span>
            )}
            <Input 
                label = {"Password"}
                type = "password"
                placeholder = "Password"
                id = {"password"}
                {...register("password", { required: true })}
                className = "mb-4"
            />
            {errors.password && (
                <span className="text-red-500 text-sm">
                    {errors.password.message}
                </span>
            )}
            <SpecialButton type="submit">{isPending ? "Logging in": "Login"}</SpecialButton>
        </form>
    )
}

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
}

export default LoginForm;