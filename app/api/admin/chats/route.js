import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

export async function GET(request, { params }) {
  if (!databaseUrl) {
    return new Response(
      JSON.stringify({
        error: "Database is not configured.",
      }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const sql = neon(databaseUrl);

  try {
    const { sessionId } = await params;

    const chats = await sql`
      SELECT *
      FROM chats
      WHERE session_id = ${sessionId}
      ORDER BY created_at ASC
    `;

    return Response.json(chats);
  } catch (error) {
    console.error("Failed to fetch chats:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch chats.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}