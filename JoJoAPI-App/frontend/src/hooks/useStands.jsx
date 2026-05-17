import { getStands } from "../services/getStands.js";
import { useQuery } from "@tanstack/react-query";

export function useStands(filters) {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["stands", filters],
        queryFn: () => getStands(filters),
        placeholderData: (previousData) => previousData,
    });

    return {
        data: data?.data || [],
        nextPage: data?.nextPage || null,
        prevPage: data?.prevPage || null,
        totalPages: data?.totalPages || 0,
        isLoading,
        error: isError ? (error?.message || "An error occurred") : null,
    };
}