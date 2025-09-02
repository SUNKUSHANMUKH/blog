"use client";

import { Post, deletePost } from "../lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostCard({ post }: { post: Post }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleDelete() {
    await deletePost(post._id);
    setShowConfirm(false);
    router.refresh(); // reload posts
  }

  return (
    <div className="flex flex-col justify-between h-full p-6 border rounded-xl shadow-sm bg-white dark:bg-[#12001a]">
      {/* Post content */}
      <div>
        <h2 className="text-xl font-bold uppercase">{post.title}</h2>
        <p className="text-white text-sm mb-4 text-left">By {post.author}</p>
        <p className="mb-2 text-center">{post.content}</p>
        <div className="flex gap-2 flex-wrap mb-2">
          {post.tags.map((t: string) => (
            <span
              key={t}
              className="px-2 py-1 text-xs rounded-full bg-white text-black border shadow-inner"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Actions at bottom */}
      <div className="flex gap-3 mt-4">
        <a
          href={`/posts/${post._id}`}
          className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
        >
          View
        </a>
        <a
          href={`/posts/${post._id}/edit`}
          className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
        >
          Edit
        </a>
        <button
          onClick={() => setShowConfirm(true)}
          className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>

      {/* ✅ Custom confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p className="mb-6">Do you really want to delete this blog post?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
