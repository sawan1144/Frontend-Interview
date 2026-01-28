export type Blog = {
    id: string
    title: string
    category: string[]
    description: string
    date: string
    coverImage: string
    content: string
}

export type CreateBlogInput = Omit<Blog, "id">

const API_BASE = "http://localhost:3001"

export async function fetchBlogs(): Promise<Blog[]> {
    const res = await fetch(`${API_BASE}/blogs`)
    if (!res.ok) throw new Error("Failed to fetch blogs")
    return res.json()
}

export async function fetchBlogById(id: string): Promise<Blog> {
    const res = await fetch(`${API_BASE}/blogs/${id}`)
    if (!res.ok) throw new Error("Failed to fetch blog")
    return res.json()
}

export async function createBlog(data: CreateBlogInput): Promise<Blog> {
    const res = await fetch(`${API_BASE}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create blog")
    return res.json()
}
