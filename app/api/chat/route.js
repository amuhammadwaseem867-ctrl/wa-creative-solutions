export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return Response.json(
        {
          message: "Invalid messages.",
        },
        {
          status: 400,
        }
      );
    }

    if (!process.env.OLLAMA_API_KEY) {
      console.error("OLLAMA_API_KEY is missing.");

      return Response.json(
        {
          message:
            "Ollama API key is not configured.",
        },
        {
          status: 500,
        }
      );
    }

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

              content: `
You are the AI customer support assistant for WA Creative Solutions.

WA Creative Solutions provides:

- Branding
- Logo Design
- Graphic Design
- UI/UX Design
- Website Design
- Website Development
- Next.js Development
- Responsive Websites
- Digital Experiences

Your role is to help website visitors understand
WA Creative Solutions and guide potential clients.

Be friendly, professional, concise and helpful.

When asked about services:
Explain the relevant service clearly.

When asked about pricing:
Explain that pricing depends on project requirements
and that WA Creative Solutions provides custom quotes.

Never invent:
- prices
- clients
- awards
- testimonials
- statistics
- guarantees

If a visitor wants to start a project:
Encourage them to contact WA Creative Solutions
for a custom project discussion.

Always represent WA Creative Solutions professionally.
              `,
            },

            ...messages,
          ],

          stream: false,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();

      console.error(
        "OLLAMA CLOUD ERROR:",
        response.status,
        error
      );

      return Response.json(
        {
          message:
            `Ollama Cloud error (${response.status}): ${error}`,
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    const assistantMessage =
      data?.message?.content;

    if (!assistantMessage) {
      console.error(
        "OLLAMA EMPTY RESPONSE:",
        data
      );

      return Response.json(
        {
          message:
            "Ollama returned an empty response.",
        },
        {
          status: 500,
        }
      );
    }

    return Response.json({
      message: assistantMessage,
    });
  } catch (error) {
    console.error(
      "CHAT ROUTE ERROR:",
      error
    );

    return Response.json(
      {
        message:
          error?.message ||
          "Unable to connect to Ollama Cloud.",
      },
      {
        status: 500,
      }
    );
  }
}