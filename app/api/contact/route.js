import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      company,
      service,
      message,
    } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return Response.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        {
          success: false,
          message: "Resend API key is missing.",
        },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,

      subject: `New Project Inquiry — ${name}`,

      html: `
        <div style="
          font-family: Arial, Helvetica, sans-serif;
          background: #080908;
          color: #f4f6ef;
          padding: 40px;
          line-height: 1.6;
        ">

          <div style="
            max-width: 700px;
            margin: 0 auto;
            background: #111411;
            border: 1px solid #2b302b;
            padding: 35px;
          ">

            <div style="
              color: #c8ff3d;
              font-size: 12px;
              font-weight: bold;
              letter-spacing: 2px;
              margin-bottom: 25px;
            ">
              WA CREATIVE SOLUTIONS
            </div>

            <h1 style="
              margin: 0 0 10px;
              font-size: 32px;
              color: #f4f6ef;
            ">
              New Project Inquiry
            </h1>

            <p style="
              color: #9da59d;
              margin-bottom: 35px;
            ">
              Someone has submitted a new project inquiry through your website.
            </p>

            <div style="
              border-top: 1px solid #2b302b;
            ">

              <div style="
                padding: 18px 0;
                border-bottom: 1px solid #2b302b;
              ">
                <strong style="color:#c8ff3d;">
                  NAME
                </strong>
                <div style="margin-top:6px;">
                  ${escapeHtml(name)}
                </div>
              </div>

              <div style="
                padding: 18px 0;
                border-bottom: 1px solid #2b302b;
              ">
                <strong style="color:#c8ff3d;">
                  EMAIL
                </strong>
                <div style="margin-top:6px;">
                  ${escapeHtml(email)}
                </div>
              </div>

              <div style="
                padding: 18px 0;
                border-bottom: 1px solid #2b302b;
              ">
                <strong style="color:#c8ff3d;">
                  COMPANY / BRAND
                </strong>
                <div style="margin-top:6px;">
                  ${escapeHtml(company || "Not provided")}
                </div>
              </div>

              <div style="
                padding: 18px 0;
                border-bottom: 1px solid #2b302b;
              ">
                <strong style="color:#c8ff3d;">
                  SERVICE
                </strong>
                <div style="margin-top:6px;">
                  ${escapeHtml(service)}
                </div>
              </div>

              <div style="
                padding: 18px 0;
              ">
                <strong style="color:#c8ff3d;">
                  PROJECT DETAILS
                </strong>

                <div style="
                  margin-top:12px;
                  color:#c5ccc3;
                  white-space:pre-wrap;
                ">
                  ${escapeHtml(message)}
                </div>
              </div>

            </div>

            <div style="
              margin-top:35px;
              padding-top:20px;
              border-top:1px solid #2b302b;
              color:#697169;
              font-size:11px;
            ">
              Sent from the WA Creative Solutions website contact form.
            </div>

          </div>

        </div>
      `,
    });

    if (error) {
      console.error("RESEND ERROR:", error);

      return Response.json(
        {
          success: false,
          message: error.message || "Failed to send email.",
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Project inquiry sent successfully.",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to send project inquiry.",
      },
      { status: 500 }
    );
  }
}

/**
 * Escape user input before inserting it into HTML email.
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}