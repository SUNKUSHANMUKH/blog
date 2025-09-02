import { getPosts } from "../lib/api";
import PostCard from "../components/PostCard";

export default async function HomePage() {
  const posts = await getPosts();

   return (
  <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {posts.length === 0 ? (
      <p className="opacity-75 col-span-2">No posts yet. Click “+ New Post”.</p>
    ) : (
      posts.map((p) => <PostCard key={p._id} post={p} />)
    )}
  </main>
);

}
