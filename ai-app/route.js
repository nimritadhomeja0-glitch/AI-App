import OpenAI from "openai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",          // or change to a model you have access to
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300
    });

    const reply = response.choices?.[0]?.message?.content ?? "No reply";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API error:", err);
    return new Response(JSON.stringify({ error: err.message || "Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
