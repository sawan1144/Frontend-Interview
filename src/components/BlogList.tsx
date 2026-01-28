import { useBlogs } from "@/hooks/useBlogs"
import { BlogCard } from "./BlogCard"
import { Skeleton } from "@/components/ui/skeleton"

type BlogListProps = {
    selectedId: string | null
    onSelect: (id: string) => void
}

function BlogCardSkeleton() {
    return (
        <div className="rounded-xl border p-6 space-y-3">
            <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-12" />
            </div>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    )
}

export function BlogList({ selectedId, onSelect }: BlogListProps) {
    const { data: blogs, isLoading, isError, error } = useBlogs()

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <BlogCardSkeleton key={i} />
                ))}
            </div>
        )
    }

    if (isError) {
        return (
            <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-6 text-center">
                <p className="text-destructive font-medium">Failed to load blogs</p>
                <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
            </div>
        )
    }

    if (!blogs || blogs.length === 0) {
        return (
            <div className="rounded-xl border p-6 text-center text-muted-foreground">
                No blogs found. Create your first blog!
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    isSelected={selectedId === blog.id}
                    onClick={() => onSelect(blog.id)}
                />
            ))}
        </div>
    )
}
