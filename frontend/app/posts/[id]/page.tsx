'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8000/posts/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Could not load post. It may not exist or the backend is not running.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8000/posts/${postId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      
      router.push('/posts');
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Failed to delete post. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <p>Loading post...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 mb-4">
          {error || 'Post not found'}
        </div>
        <Link 
          href="/posts" 
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to posts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link 
        href="/posts" 
        className="text-blue-600 dark:text-blue-400 hover:underline mb-6 block"
      >
        ← Back to posts
      </Link>
      
      <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 mb-6">
        <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        
        <div className="prose dark:prose-invert max-w-none">
          {post.content.split('\n').map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </article>
      
      <div className="flex gap-4">
        <Link 
          href={`/posts/${postId}/edit`} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Edit Post
        </Link>
        <button 
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}