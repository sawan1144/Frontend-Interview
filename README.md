# Blog Application

A clean, responsive blog app built with React, TypeScript, TanStack Query, Tailwind CSS, and shadcn/ui.

## Features

- 📖 Browse blogs in a two-panel layout
- 🔍 View full blog content with cover images
- ✍️ Create new blog posts
- 📱 Fully responsive design
- ⚡ Fast data fetching with caching

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React + TypeScript | UI Framework |
| TanStack Query | Server state management |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| JSON Server | Mock API |

## Getting Started

```bash
# Install dependencies
npm install

# Start the API server (port 3001)
npm run server

# Start the dev server (port 5173)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
src/
├── lib/api.ts           # API functions & types
├── hooks/useBlogs.ts    # TanStack Query hooks
├── components/
│   ├── ui/              # shadcn components
│   ├── BlogCard.tsx     # Blog preview card
│   ├── BlogList.tsx     # Blog list with loading states
│   ├── BlogDetail.tsx   # Full blog view
│   └── CreateBlogForm.tsx
└── App.tsx              # Main layout
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blogs` | Get all blogs |
| GET | `/blogs/:id` | Get blog by ID |
| POST | `/blogs` | Create new blog |
