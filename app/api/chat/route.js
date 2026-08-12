import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const body = await request.json();
    const messages = body?.messages;

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        {
          message: "Please enter a message.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5-mini",

      instructions: `
You are the AI customer support assistant for WA Creative Solutions.

WA Creative Solutions is a creative design and web development studio.

Services offered:
- Branding
- Logo Design
- Graphic Design
- UI/UX Design
- Website Design
- Website Development
- Next.js Development
- Responsive Websites
- Digital Experiences

Your role is to help website visitors understand our services
and guide potential clients toward starting a project.

Be professional, friendly, helpful, and concise.

If someone asks about pricing:
Explain that pricing depends on the project requirements.
Do not invent a fixed price.
Encourage the visitor to request a custom quote.

If someone wants to start a project, ask for:
- Name
- Email
- Company or business name
- Required service
- Project requirements

Never invent clients, awards, statistics, testimonials,
or services that are not listed above.

Do not claim to be human.

You are the AI customer support assistant for
WA Creative Solutions.
      `,

      input: messages.map((message) => ({
        role: message.role === "user" ? "user" : "assistant",
        content: message.content,
      })),
    });

    return Response.json({
      message: response.output_text,
    });
  } catch (error) {
    console.error("========== OPENAI ERROR ==========");
    console.error(error);
    console.error("==================================");

    return Response.json(
      {
        message:
          error?.message ||
          "The AI service is temporarily unavailable. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}