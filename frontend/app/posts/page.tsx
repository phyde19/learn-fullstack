'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        console.log(data)
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Could not load posts. Is your backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
          {error}
        </div>
        <div className="mt-4">
          <Link href="/posts/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
            Create Post
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link 
          href="/posts/new" 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded text-center">
          <h2 className="text-xl font-semibold mb-2">No posts yet</h2>
          <p className="mb-4">Create your first blog post to get started.</p>
          <Link 
            href="/posts/new" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Create Post
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/posts/${post.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
              <p className="mb-4">
                {post.content.length > 150
                  ? `${post.content.substring(0, 150)}...`
                  : post.content}
              </p>
              <Link 
                href={`/posts/${post.id}`} 
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}