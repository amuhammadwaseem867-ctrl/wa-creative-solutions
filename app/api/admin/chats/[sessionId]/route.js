import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET(request, { params }) {
  try {
    const { sessionId } = await params;

    if (!sessionId) {
      return Response.json(
        {
          success: false,
          message: "Session ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const messages = await sql`
      SELECT
        id,
        session_id,
        role,
        message,
        created_at
      FROM chat_conversations
      WHERE session_id = ${sessionId}
      ORDER BY created_at ASC
    `;

    return Response.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error(
      "ADMIN CHAT MESSAGES API ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message: "Unable to load conversation.",
      },
      {
        status: 500,
      }
    );
  }
}