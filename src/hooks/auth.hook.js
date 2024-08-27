import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
    login,
    logout,
    register,
    changePassword,
    currentUser
} from "../api/authAPI";

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user) => login(user),
        onSuccess: (data) => {
            queryClient.invalidateQueries("currentUser");
        },
        retry: 0,
    })
}

export const useLogout = () => {}
export const useRegister = () => {}
export const useChangePassword = () => {}
export const useCurrentUser = () => {}
