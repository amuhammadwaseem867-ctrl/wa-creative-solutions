import { neon } from "@neondatabase/serverless";
import { isAdminAuthenticated } from "@/lib/adminAuth";

export async function GET() {
  try {
    const authenticated =
      await isAdminAuthenticated();

    console.log(
      "ADMIN AUTH:",
      authenticated
    );

    if (!authenticated) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const databaseUrl =
      process.env.DATABASE_URL;

    if (!databaseUrl) {
      return Response.json(
        {
          success: false,
          message:
            "DATABASE_URL is missing.",
        },
        { status: 500 }
      );
    }

    const sql =
      neon(databaseUrl);

    // First check actual messages
    const messages = await sql`
      SELECT
        id,
        session_id,
        role,
        message,
        created_at
      FROM chat_conversations
      ORDER BY created_at DESC
      LIMIT 200
    `;

    console.log(
      "CHAT MESSAGES:",
      messages
    );

    // Build conversations
    const conversations =
      await sql`
        SELECT
          session_id,
          MIN(created_at) AS started_at,
          MAX(created_at) AS last_message_at,
          COUNT(*)::int AS message_count
        FROM chat_conversations
        GROUP BY session_id
        ORDER BY last_message_at DESC
      `;

    console.log(
      "CONVERSATIONS:",
      conversations
    );

    return Response.json({
      success: true,
      conversations,
      messages,
    });
  } catch (error) {
    console.error(
      "ADMIN CHATS ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          error?.message ||
          "Unable to load conversations.",
      },
      { status: 500 }
    );
  }
}