import { clearAdminSession } from "@/lib/adminAuth";

export async function POST() {
  try {
    await clearAdminSession();

    return Response.json({
      success: true,
      message:
        "Logged out successfully.",
    });
  } catch (error) {
    console.error(
      "ADMIN LOGOUT ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Unable to logout.",
      },
      { status: 500 }
    );
  }
}