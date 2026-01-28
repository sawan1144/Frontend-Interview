import type { Blog } from "@/lib/api"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type BlogCardProps = {
    blog: Blog
    isSelected: boolean
    onClick: () => void
}

export function BlogCard({ blog, isSelected, onClick }: BlogCardProps) {
    const formattedDate = new Date(blog.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })

    return (
        <Card
            onClick={onClick}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${isSelected ? "ring-2 ring-primary bg-accent/50" : ""
                }`}
        >
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                        {blog.category.map((cat) => (
                            <Badge key={cat} variant="secondary" className="text-[10px]">
                                {cat}
                            </Badge>
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{formattedDate}</span>
                </div>
                <h3 className="font-semibold text-base leading-tight mt-2">{blog.title}</h3>
            </CardHeader>
            <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">{blog.description}</p>
            </CardContent>
        </Card>
    )
}
