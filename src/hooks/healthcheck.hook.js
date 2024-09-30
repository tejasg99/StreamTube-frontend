import { useQuery } from "@tanstack/react-query";
import { healthcheck } from "../api/healthcheckAPI";

export const useHealthcheck = () => {
    return useQuery({
        queryKey: ["healthcheck"],
        queryFn: () => healthcheck(),
        staleTime: 1000*60*2,
        retry: 2,
    })
}