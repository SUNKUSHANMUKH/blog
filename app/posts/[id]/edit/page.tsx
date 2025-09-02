import { getPost } from "../../../../lib/api";
import PostForm from "../../../../components/PostForm";

// ✅ CORRECT
export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // 👈 await it first
  const post = await getPost(id);
  return <PostForm post={post} />;
}

