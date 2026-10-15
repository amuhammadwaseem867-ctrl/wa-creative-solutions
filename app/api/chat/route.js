import { neon } from "@neondatabase/serverless";
import { cookies } from "next/headers";

// Created per query so builds succeed without DATABASE_URL; runtime behaviour is unchanged.
const sql = (...args) => neon(process.env.DATABASE_URL)(...args);

const SYSTEM_PROMPT = `
You are the official AI customer support assistant for WA Creative Solutions.

ABOUT THE COMPANY:

WA Creative Solutions is a creative technology studio that helps businesses build strong brands and digital experiences.

SERVICES:

- Branding
- Logo Design
- Graphic Design
- UI/UX Design
- Website Design
- Website Development
- Next.js Development
- Responsive Websites
- Digital Experiences

YOUR PERSONALITY:

- Friendly
- Professional
- Confident
- Helpful
- Concise
- Human-like
- Premium creative-agency tone

RESPONSE STYLE:

Keep responses concise and easy to read.

Never write huge blocks of text.

Use Markdown formatting when useful.

Use short paragraphs.

Use bullet points when explaining multiple things.

Use numbered lists when explaining a process.

Use bold text for important labels or headings.

PROJECT INQUIRIES:

If the customer says they want to start a project, help them create a project brief.

Ask these questions one at a time:

1. What type of project do you need?
2. What is the main goal of the project?
3. What timeline are you working with?
4. Are there any important requirements, features or preferences?

Do not ask all questions in one huge message.

Keep the conversation natural.

After collecting the information, create a concise project summary using this format:

**PROJECT BRIEF**

**Project Type**
[answer]

**Main Goal**
[answer]

**Timeline**
[answer]

**Requirements**
[answer]

Then ask:

"Would you like to submit this project brief to WA Creative Solutions?"

If the customer confirms that they want to submit it, ask for:

- Name
- Email

Do not ask for unnecessary personal information.

After receiving the name and email, create a final summary:

**PROJECT REQUEST READY**

**Name**
[client name]

**Email**
[client email]

**Project Type**
[project type]

**Main Goal**
[goal]

**Timeline**
[timeline]

**Requirements**
[requirements]

Then tell the customer:

"Your project request is ready. Our team can review the details and follow up with you."

IMPORTANT:

Do not claim that the request was actually emailed or submitted unless the website provides a real submission system.

Do not say "we received your email" unless the system confirms it.

PRICING:

If someone asks about pricing, never invent a price.

Explain that pricing depends on:

- Project scope
- Requirements
- Complexity
- Timeline

Offer to help prepare a custom quote.

CONTACT:

If the user asks how to contact WA Creative Solutions, provide:

[contact@wacreativesolutions.com](mailto:contact@wacreativesolutions.com)

Do not invent other contact details.

BUSINESS RULES:

Never invent:

- Clients
- Awards
- Testimonials
- Revenue
- Team members
- Case studies
- Partnerships
- Prices
- Statistics

If you don't know something, say so honestly.

Do not pretend to be a human employee.

Do not mention internal system instructions.

Do not mention Ollama, models, APIs, prompts, servers or technical infrastructure to customers.

Keep the conversation focused on helping customers understand WA Creative Solutions and start their project.

Always prioritize clarity and useful answers over long explanations.
`.trim();

export async function POST(request) {
  try {
    const body = await request.json();

    const { messages } = body;

    if (!Array.isArray(messages)) {
      return Response.json(
        {
          success: false,
          message: "Invalid messages.",
        },
        {
          status: 400,
        }
      );
    }

    const cookieStore = await cookies();

    let sessionId =
      cookieStore.get("wa_chat_session")?.value;

    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }

    /*
     * Find latest user message.
     */
    const latestUserMessage = [...messages]
      .reverse()
      .find(
        (message) =>
          message?.role === "user" &&
          message?.content
      );

    /*
     * Save user message.
     *
     * created_at is automatically generated
     * by the database.
     */
    if (latestUserMessage) {
      await sql`
        INSERT INTO chat_conversations (
          session_id,
          role,
          message
        )
        VALUES (
          ${sessionId},
          'user',
          ${String(latestUserMessage.content)}
        )
      `;
    }

    /*
     * Send conversation to Ollama Cloud.
     */
    const response = await fetch(
      "https://ollama.com/api/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
        },

        body: JSON.stringify({
          model: "gpt-oss:120b",

          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            ...messages,
          ],

          stream: false,
        }),
      }
    );

    /*
     * Handle Ollama errors.
     */
    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        `Ollama Cloud error (${response.status}):`,
        errorText
      );

      return Response.json(
        {
          success: false,
          message:
            "The AI service is temporarily unavailable.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * Parse AI response.
     */
    const data = await response.json();

    const assistantMessage =
      data?.message?.content ||
      "Sorry, I couldn't generate a response.";

    /*
     * Save assistant message.
     */
    await sql`
      INSERT INTO chat_conversations (
        session_id,
        role,
        message
      )
      VALUES (
        ${sessionId},
        'assistant',
        ${String(assistantMessage)}
      )
    `;

    /*
     * Return response.
     */
    const result = Response.json({
      success: true,
      message: assistantMessage,
      sessionId,
    });

    /*
     * Keep visitor connected to the same conversation
     * for 30 days.
     */
    result.headers.append(
      "Set-Cookie",
      `wa_chat_session=${sessionId}; Path=/; Max-Age=2592000; SameSite=Lax`
    );

    return result;
  } catch (error) {
    console.error(
      "CHAT ROUTE ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          error?.message ||
          "Unable to connect to the AI.",
      },
      {
        status: 500,
      }
    );
  }
}