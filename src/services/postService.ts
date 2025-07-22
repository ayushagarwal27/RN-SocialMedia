export async function fetchPosts(accessToken?: string) {
  const res = await fetch("/api/posts", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    throw new Error("error while fetching posts");
  }

  const data = await res.json();
  return data.posts;
}

export async function fetchPost(id: string, accessToken?: string) {
  const res = await fetch("/api/posts" + `/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (res.status === 404) {
    throw new Error("Post not found");
  }

  if (!res.ok) {
    throw new Error("Error while fetching post");
  }

  return await res.json();
}
