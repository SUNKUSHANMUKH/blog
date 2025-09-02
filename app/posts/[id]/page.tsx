import { getPost } from "../../../lib/api";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // 👈 must await
  const post = await getPost(id);

  return (
    <div className="max-w-2xl mx-auto text-black p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-black mb-4">By {post.author}</p>
      <div className="prose">{post.content}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={tag} className="bg-grey-200 text-sm px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

