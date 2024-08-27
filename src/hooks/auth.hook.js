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

export const useLogout = () => {
    return useMutation({
        mutationFn: () => logout(),
    })
}

export const useRegister = () => {
    return useMutation({
        mutationFn: (user) => register(user), 
    })
}

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (data) => changePassword(data),
    })
}

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: currentUser(),
        staleTime: 1000*60*5,
        retry: 1,
    })
}
