// Val.town HTTP Val Server Code for Next Gen Devs Gemini AI Chatbot
// Environment Variable on Val.town: API_GEMINI_KEY

export default async function (req: Request): Promise<Response> {
  // 1. CORS Headers for Browser & App Calls
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Friendly GET Response when opening URL directly in a browser tab
  if (req.method === "GET") {
    return new Response(
      `<!DOCTYPE html>
      <html>
        <head>
          <title>Next Gen Devs AI Server</title>
          <style>
            body { background: #07070a; color: #fff; font-family: monospace; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .card { background: #111118; border: 1px solid #10b981; padding: 2rem; border-radius: 1.5rem; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
            h1 { color: #10b981; font-size: 1.2rem; }
            p { color: #a1a1aa; font-size: 0.85rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>🚀 NEXT GEN DEVS AI SERVER ONLINE</h1>
            <p>Gemini AI & Firebase Chatbot API is operational.</p>
          </div>
        </body>
      </html>`,
      { headers: { ...corsHeaders, "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Only POST method allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { message, siteContent, projects } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(JSON.stringify({ error: "Message string required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Read Gemini API Key from Val.town Environment Variables (API_GEMINI_KEY)
    const apiKey = typeof Deno !== "undefined"
      ? Deno.env.get("API_GEMINI_KEY")
      : (typeof process !== "undefined" ? process.env.API_GEMINI_KEY : "");

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply: "⚠️ Val.town Notice: API_GEMINI_KEY variable is missing on Val.town server.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format Firebase Data
    const formattedContent = siteContent
      ? Object.entries(siteContent)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
      : "Default Studio Data";

    const formattedProjects = projects && Array.isArray(projects)
      ? projects
          .map(
            (p: any) =>
              `- Title: ${p.title}\n  Category: ${p.category}\n  Subtitle: ${p.subtitle}\n  Description: ${p.description}\n  Live URL: ${p.liveUrl}\n  Tech Stack: ${
                p.techStack?.join(", ") || ""
              }`
          )
          .join("\n\n")
      : "No live projects provided";

    // Strict System Prompt for Gemini AI
    const systemPrompt = `
You are the official AI Assistant for "NEXT GEN DEVS STUDIO" (Creative Technology Studio 2026).

STRICT OPERATING RULES:
1. You ONLY answer questions using the provided Website Data and Firebase Projects Data below.
2. If the user asks about ANYTHING NOT related to Next Gen Devs, its services, projects, tech stack, or booking a project (e.g., general knowledge, math, weather, unrelated coding homework, competitor companies), politely decline and state:
"I am the AI Assistant for Next Gen Devs Studio 🤖. I am trained specifically to answer questions about Next Gen Devs, our services, portfolio projects, tech stack, and helping you start a project with us!"
3. Speak in a friendly, professional, concise, and helpful tone. Respond in the exact language used by the user (Arabic or English).
4. When relevant, encourage users to click "START A PROJECT" or reach out via WhatsApp / Email.

--- FIREBASE WEBSITE DATA ---
${formattedContent}

--- FIREBASE LIVE PROJECTS DATA ---
${formattedProjects}
`;

    // Call Google Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: systemPrompt },
              { text: `User Question: ${message}` },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 500,
        },
      }),
    });

    const geminiData = await geminiResponse.json();

    if (!geminiResponse.ok) {
      return new Response(
        JSON.stringify({
          reply: `Gemini API Notice: ${geminiData.error?.message || "Failed to process question."}`,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiReply =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Thank you for contacting Next Gen Devs! How else can I assist you with your project?";

    return new Response(JSON.stringify({ reply: aiReply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ reply: "Server error processing request: " + err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}
