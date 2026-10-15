import { neon } from "@neondatabase/serverless";
import { isAdminAuthenticated } from "@/lib/adminAuth";

// Created per query so builds succeed without DATABASE_URL; runtime behaviour is unchanged.
const sql = (...args) => neon(process.env.DATABASE_URL)(...args);

export async function GET(
  request,
  { params }
) {
  try {
    const authenticated =
      await isAdminAuthenticated();

    if (!authenticated) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const { sessionId } = await params;

    if (!sessionId) {
      return Response.json(
        {
          success: false,
          message:
            "Session ID is required.",
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
        message:
          "Unable to load conversation.",
      },
      {
        status: 500,
      }
    );
  }
}