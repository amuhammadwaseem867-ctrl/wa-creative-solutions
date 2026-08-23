import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";
import { Resend } from "resend";

const sql = neon(process.env.DATABASE_URL);

const resend = new Resend(process.env.RESEND_API_KEY);

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
      conversation,
    } = body;

    /*
     * Validate required fields
     */
    if (
      !name?.trim() ||
      !email?.trim() ||
      !projectType?.trim() ||
      !goal?.trim()
    ) {
      return Response.json(
        {
          success: false,
          message:
            "Please provide all required project details.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Validate email
     */
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      return Response.json(
        {
          success: false,
          message:
            "Please provide a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Get existing AI chat session.
     */
    const cookieStore = await cookies();

    let sessionId =
      cookieStore.get("wa_chat_session")?.value;

    /*
     * If somehow the visitor doesn't have a session,
     * create one.
     */
    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }

    /*
     * Clean values.
     */
    const clientName = name.trim();
    const clientEmail = email.trim().toLowerCase();
    const cleanProjectType = projectType.trim();
    const cleanGoal = goal.trim();
    const cleanTimeline =
      timeline?.trim() || "Not provided";
    const cleanRequirements =
      requirements?.trim() || "Not provided";

    /*
     * Save client information to the conversation.
     *
     * This updates the existing conversation messages
     * instead of creating a completely separate chat.
     */
    await sql`
      UPDATE chat_conversations
      SET
        client_name = ${clientName},
        client_email = ${clientEmail}
      WHERE session_id = ${sessionId}
    `;

    /*
     * Create a project request summary.
     */
    const projectSummary = `
PROJECT REQUEST

Name:
${clientName}

Email:
${clientEmail}

Project Type:
${cleanProjectType}

Main Goal:
${cleanGoal}

Timeline:
${cleanTimeline}

Requirements:
${cleanRequirements}
`.trim();

    /*
     * Save project request as an assistant/system record
     * inside the same conversation.
     */
    await sql`
      INSERT INTO chat_conversations (
        session_id,
        role,
        message,
        client_name,
        client_email
      )
      VALUES (
        ${sessionId},
        'assistant',
        ${projectSummary},
        ${clientName},
        ${clientEmail}
      )
    `;

    /*
     * Prepare email HTML.
     */
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Project Request</h2>

        <p><strong>Name:</strong> ${escapeHtml(clientName)}</p>

        <p><strong>Email:</strong> ${escapeHtml(clientEmail)}</p>

        <p>
          <strong>Project Type:</strong>
          ${escapeHtml(cleanProjectType)}
        </p>

        <p>
          <strong>Main Goal:</strong>
          ${escapeHtml(cleanGoal)}
        </p>

        <p>
          <strong>Timeline:</strong>
          ${escapeHtml(cleanTimeline)}
        </p>

        <p>
          <strong>Requirements:</strong><br />
          ${escapeHtml(cleanRequirements).replace(
            /\n/g,
            "<br />"
          )}
        </p>

        <hr />

        <p>
          <strong>Chat Session:</strong>
          ${escapeHtml(sessionId)}
        </p>
      </div>
    `;

    /*
     * Send email through Resend.
     */
    const { error: resendError } =
      await resend.emails.send({
        from:
          "WA Creative Solutions <hello@wacreativesolution.com>",
        to: ["amuhammadwaseem867@gmail.com"],
        replyTo: clientEmail,
        subject: `New Project Request — ${clientName}`,
        html: emailHtml,
      });

    if (resendError) {
      console.error(
        "RESEND PROJECT REQUEST ERROR:",
        resendError
      );

      /*
       * Database has already saved the request.
       * We don't lose the lead if email delivery fails.
       */
      return Response.json(
        {
          success: true,
          emailSent: false,
          message:
            "Your project request has been saved successfully. Our team will review it.",
        },
        {
          status: 200,
        }
      );
    }

    /*
     * Return success.
     */
    const response = Response.json(
      {
        success: true,
        emailSent: true,
        message:
          "Your project request has been submitted successfully.",
      },
      {
        status: 200,
      }
    );

    /*
     * Keep the same chat session.
     */
    response.headers.append(
      "Set-Cookie",
      `wa_chat_session=${sessionId}; Path=/; Max-Age=2592000; SameSite=Lax`
    );

    return response;
  } catch (error) {
    console.error(
      "PROJECT REQUEST ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          error?.message ||
          "Unable to process your project request.",
      },
      {
        status: 500,
      }
    );
  }
}

/*
 * Prevent user-provided data from being interpreted
 * as HTML inside the email.
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}