const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Post = {
  _id: string;
  title: string;
  author: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts`, { cache: "no-store" });
  return res.json();
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${id}`);
  return res.json();
}

export async function createPost(data: Partial<Post>) {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updatePost(id: string, data: Partial<Post>) {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletePost(id: string) {
  const res = await fetch(`${API_URL}/posts/${id}`, { method: "DELETE" });

  if (res.status === 204) return { success: true };
  if (!res.ok) throw new Error(`Failed to delete post: ${res.status}`);

  return res.json();
}
