import dummyPosts from "@/dummyPosts";

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEON_DATABASE_URL!);

export async function GET(req: Request) {
  const posts = dummyPosts;

  const result = await sql`SELECT version()`;
  console.log(result);
  return Response.json({ posts });
}

export async function POST(req: Request) {
  const { content } = await req.json();
  const newPost = {
    id: 123,
    content,
    user_id: "user_id",
  };
  return new Response(JSON.stringify(newPost), { status: 201 });
}
