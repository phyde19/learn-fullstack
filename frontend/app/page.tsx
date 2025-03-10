import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">DevBlog</h1>
        <p className="text-xl text-gray-600">Share your coding journey</p>
      </header>

      <section className="mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800">
          <h2 className="text-2xl font-semibold mb-4">Welcome to DevBlog</h2>
          <p className="mb-4">
            A simple blog platform for developers to share their thoughts, tutorials, and experiences.
          </p>
          <div className="flex gap-4 mt-6">
            <Link 
              href="/posts" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Browse Posts
            </Link>
            <Link 
              href="/posts/new" 
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/50"
            >
              Create Post
            </Link>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        <p className="mb-4">
          This frontend is already connected to the FastAPI backend you'll be implementing. 
          Start by creating the <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">Post</code> model 
          and the endpoints needed for basic CRUD operations.
        </p>
      </section>
    </div>
  );
}