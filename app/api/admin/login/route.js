import { createAdminSession } from "@/lib/adminAuth";

export async function POST(request) {
  try {
    const body = await request.json();

    const email =
      typeof body?.email === "string"
        ? body.email.trim()
        : "";

    const password =
      typeof body?.password === "string"
        ? body.password
        : "";

    const adminEmail =
      process.env.ADMIN_EMAIL?.trim();

    const adminPassword =
      process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error(
        "ADMIN LOGIN: Missing ADMIN_EMAIL or ADMIN_PASSWORD"
      );

      return Response.json(
        {
          success: false,
          message:
            "Admin authentication is not configured.",
        },
        { status: 500 }
      );
    }

    if (
      email.toLowerCase() !==
        adminEmail.toLowerCase() ||
      password !== adminPassword
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    await createAdminSession(
      adminEmail
    );

    return Response.json({
      success: true,
      message: "Login successful.",
    });
  } catch (error) {
    console.error(
      "ADMIN LOGIN ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Unable to login.",
      },
      { status: 500 }
    );
  }
}