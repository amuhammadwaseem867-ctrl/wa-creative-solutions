import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
  try {
    const chats = await sql`
      SELECT
        session_id,
        COUNT(*)::int AS message_count,
        MIN(created_at) AS started_at,
        MAX(created_at) AS last_message_at
      FROM chat_conversations
      GROUP BY session_id
      ORDER BY last_message_at DESC
    `;

    return Response.json({
      success: true,
      chats,
    });
  } catch (error) {
    console.error("ADMIN CHAT API ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to load conversations.",
      },
      {
        status: 500,
      }
    );
  }
}