import { useState } from "react"
import { BlogList } from "@/components/BlogList"
import { BlogDetail } from "@/components/BlogDetail"
import { CreateBlogForm } from "@/components/CreateBlogForm"
import { Button } from "@/components/ui/button"

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [mobileView, setMobileView] = useState<"list" | "detail">("list")

  const handleSelectBlog = (id: string) => {
    setSelectedBlogId(id)
    setMobileView("detail")
  }

  const handleBackToList = () => {
    setMobileView("list")
  }

  const handleCreateSuccess = () => {
    setShowCreateForm(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold">Blog</h1>
            <Button onClick={() => setShowCreateForm(true)} size="sm">
              New Blog
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showCreateForm ? (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Create New Blog</h2>
            <CreateBlogForm
              onSuccess={handleCreateSuccess}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <aside
              className={`lg:col-span-4 xl:col-span-3 ${mobileView === "detail" ? "hidden lg:block" : "block"
                }`}
            >
              <div className="lg:sticky lg:top-24 space-y-4">
                <h2 className="text-lg font-semibold text-muted-foreground">Latest Articles</h2>
                <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-2 space-y-4">
                  <BlogList selectedId={selectedBlogId} onSelect={handleSelectBlog} />
                </div>
              </div>
            </aside>

            <section
              className={`lg:col-span-8 xl:col-span-9 ${mobileView === "list" ? "hidden lg:block" : "block"
                }`}
            >
              <BlogDetail
                blogId={selectedBlogId}
                onBack={handleBackToList}
              />
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
