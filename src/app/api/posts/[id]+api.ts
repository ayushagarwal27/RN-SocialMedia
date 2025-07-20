import dummyPosts from "@/dummyPosts";

export function GET(req: Request, { id }: { id: string }) {
  const post = dummyPosts.find((post) => post.id === Number(id));

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  return Response.json({ post });
}
