export async function fetchPosts(
  pageParam: { cursor?: string; limit?: number },
  accessToken?: string
) {
  const searchParams = new URLSearchParams();
  if (pageParam.cursor) {
    searchParams.append("cursor", pageParam.cursor);
  }
  if (pageParam.limit) {
    searchParams.append("limit", pageParam.limit.toString());
  }

  const url = `/api/posts?${searchParams.toString()}`;

  const res = await fetch(url, {
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

type CreatePostInput = { content: string };

export async function createPostRequest(
  post: CreatePostInput,
  accessToken: string
) {
  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
}

export async function likePostRequest(id: number, accessToken: string) {
  const response = await fetch(`/api/posts/${id}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to like post");
  }

  return await response.json();
}

export async function unlikePostRequest(id: number, accessToken: string) {
  const response = await fetch(`/api/posts/${id}/like`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to unlike post");
  }

  return true;
}
