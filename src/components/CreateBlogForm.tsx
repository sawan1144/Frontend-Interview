import { useState } from "react"
import { useCreateBlog } from "@/hooks/useBlogs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type CreateBlogFormProps = {
    onSuccess: () => void
    onCancel: () => void
}

export function CreateBlogForm({ onSuccess, onCancel }: CreateBlogFormProps) {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")
    const [coverImage, setCoverImage] = useState("")

    const createBlog = useCreateBlog()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const categories = category
            .split(",")
            .map((c) => c.trim().toUpperCase())
            .filter(Boolean)

        createBlog.mutate(
            {
                title,
                category: categories,
                description,
                content,
                coverImage,
                date: new Date().toISOString(),
            },
            {
                onSuccess: () => {
                    setTitle("")
                    setCategory("")
                    setDescription("")
                    setContent("")
                    setCoverImage("")
                    onSuccess()
                },
            }
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Categories</label>
                <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Tech, Finance (comma separated)"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image URL</label>
                <Input
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    type="url"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief summary of your blog"
                    rows={2}
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog content here..."
                    rows={6}
                    required
                />
            </div>

            <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={createBlog.isPending}>
                    {createBlog.isPending ? "Creating..." : "Create Blog"}
                </Button>
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
            </div>

            {createBlog.isError && (
                <p className="text-sm text-destructive">
                    Failed to create blog. Please try again.
                </p>
            )}
        </form>
    )
}
