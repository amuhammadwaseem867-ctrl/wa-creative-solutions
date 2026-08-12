import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const response = await openai.responses.create({
      model: "gpt-5-mini",

      instructions: `
You are the AI customer support assistant for WA Creative Solutions.

WA Creative Solutions is a creative design and web development studio.

Services:
- Branding
- Logo Design
- Graphic Design
- UI/UX Design
- Website Design
- Website Development
- Next.js Development
- Responsive Websites
- Digital Experiences

Be professional, friendly, concise and helpful.

If a visitor asks about pricing, explain that pricing depends on their project requirements and recommend contacting WA Creative Solutions for a quote.

If a visitor wants to start a project, ask for:
- Name
- Email
- Company or business name
- Required service
- Project requirements

Never invent prices, clients, awards or statistics.

Do not claim to be human.

You are the AI support assistant for WA Creative Solutions.
      `,

      input: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    return Response.json({
      message: response.output_text,
    });
  } catch (error) {
    console.error("OPENAI ERROR:", error);

    return Response.json(
      {
        message:
          "Sorry, I'm having trouble connecting right now. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}