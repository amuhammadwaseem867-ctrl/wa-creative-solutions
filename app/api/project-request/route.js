export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      projectType,
      goal,
      timeline,
      requirements,
    } = body;

    if (
      !name ||
      !email ||
      !projectType ||
      !goal
    ) {
      return Response.json(
        {
          message:
            "Please provide all required project details.",
        },
        {
          status: 400,
        }
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return Response.json(
        {
          message:
            "Please provide a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    /*
      PROJECT REQUEST RECEIVED

      For now we validate and prepare
      the project request.

      We are NOT claiming that an email
      has been sent yet.
    */

    console.log("NEW PROJECT REQUEST:", {
      name,
      email,
      projectType,
      goal,
      timeline,
      requirements,
      receivedAt:
        new Date().toISOString(),
    });

    return Response.json(
      {
        success: true,
        message:
          "Your project request is ready for review.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "PROJECT REQUEST ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Unable to process your project request.",
      },
      {
        status: 500,
      }
    );
  }
}
