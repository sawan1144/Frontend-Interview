import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchBlogs, fetchBlogById, createBlog, type CreateBlogInput } from "@/lib/api"

export function useBlogs() {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: fetchBlogs,
    })
}

export function useBlog(id: string | null) {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => fetchBlogById(id!),
        enabled: !!id,
    })
}

export function useCreateBlog() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: CreateBlogInput) => createBlog(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] })
        },
    })
}
