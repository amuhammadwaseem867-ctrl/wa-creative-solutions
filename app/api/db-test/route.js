import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL);

    const result = await sql`
      SELECT NOW() AS time
    `;

    return Response.json({
      success: true,
      message: "Database connected successfully.",
      time: result[0].time,
    });
  } catch (error) {
    console.error("DATABASE TEST ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Database connection failed.",
      },
      {
        status: 500,
      }
    );
  }
}