"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost, updatePost, Post } from "../lib/api";
import toast from "react-hot-toast";

export default function PostForm({ post }: { post?: Post }) {
  const [title, setTitle] = useState(post?.title || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [content, setContent] = useState(post?.content || "");
  const [tags, setTags] = useState(post?.tags.join(",") || "");

  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");

  const router = useRouter();

  // ✅ Validation functions
  const validateTitle = (value: string) => {
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (value.length < 3) return "Title must be at least 3 characters long";
    if (!regex.test(value)) return "Title must not contain special characters";
    return "";
  };

  const validateAuthor = (value: string) => {
    const regex = /^[a-zA-Z0-9 ]*$/;
    if (value.length < 5) return "Author name must be at least 5 characters long";
    if (!regex.test(value)) return "Author name must not contain special characters";
    return "";
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const tError = validateTitle(title);
    const aError = validateAuthor(author);
    setTitleError(tError);
    setAuthorError(aError);

    if (tError || aError) {
      toast.error("Please fix validation errors before submitting 🚨");
      return;
    }

    try {
      const data = {
        title,
        author,
        content,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      };

      if (post) {
        await updatePost(post._id, data);
        toast.success("Post updated successfully 🎉");
        router.push(`/posts/${post._id}`);
      } else {
        await createPost(data);
        toast.success("Post created successfully 🎉");
        router.push("/");
      }

      router.refresh();
    } catch (err) {
      toast.error("Something went wrong. Please try again ❌");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setTitleError(validateTitle(e.target.value));
        }}
        className="w-full text-black border p-2 rounded"
        required
      />
      {titleError && <p className="text-red-500 text-sm">{titleError}</p>}

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
          setAuthorError(validateAuthor(e.target.value));
        }}
        className="w-full text-black border p-2 rounded"
        required
      />
      {authorError && <p className="text-red-500 text-sm">{authorError}</p>}

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full text-black border p-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full text-black border p-2 rounded"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          disabled={!!titleError || !!authorError}
        >
          {post ? "Update Post" : "Create Post"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
