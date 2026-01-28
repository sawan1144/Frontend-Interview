import { useBlog } from "@/hooks/useBlogs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

type BlogDetailProps = {
    blogId: string | null
    onBack?: () => void
}

function BlogDetailSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="w-full h-64 rounded-xl" />
            <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <div className="flex gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    )
}

export function BlogDetail({ blogId, onBack }: BlogDetailProps) {
    const { data: blog, isLoading, isError, error } = useBlog(blogId)

    if (!blogId) {
        return (
            <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                    <p className="text-lg font-medium">Select a blog to read</p>
                    <p className="text-sm mt-1">Choose an article from the list</p>
                </div>
            </div>
        )
    }

    if (isLoading) {
        return <BlogDetailSkeleton />
    }

    if (isError) {
        return (
            <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-6 text-center">
                <p className="text-destructive font-medium">Failed to load blog</p>
                <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="text-center text-muted-foreground">Blog not found</div>
        )
    }

    const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <article className="space-y-6">
            {onBack && (
                <button
                    onClick={onBack}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 md:hidden"
                >
                    ← Back to list
                </button>
            )}

            <div className="rounded-xl overflow-hidden">
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-48 sm:h-64 object-cover"
                />
            </div>

            <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight">{blog.title}</h1>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex flex-wrap gap-1.5">
                        {blog.category.map((cat) => (
                            <Badge key={cat} variant="secondary">
                                {cat}
                            </Badge>
                        ))}
                    </div>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{formattedDate}</span>
                </div>

                <p className="text-muted-foreground leading-relaxed">{blog.description}</p>

                <div className="border-t pt-6">
                    <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
                        {blog.content}
                    </div>
                </div>
            </div>
        </article>
    )
}
