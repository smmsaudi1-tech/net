export default async function(req: Request): Promise<Response> {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Display Live Server Endpoint URL when opening GET request
  if (req.method === "GET") {
    const currentUrl = req.url;
    return new Response(
      "🚀 NEXT GEN DEVS AI SERVER ONLINE (Gemini 1.5 + Firebase)\n\n" +
      "📌 SERVER URL ENDPOINT:\n" +
      currentUrl + "\n\n" +
      "Status: Operational and listening for POST requests.",
      { headers: { ...corsHeaders, "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Only POST method allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  try {
    const body = await req.json();
    const message = body.message || "";
    const siteContent = body.siteContent || {};
    const projects = body.projects || [];

    const apiKey = typeof Deno !== "undefined"
      ? Deno.env.get("API_GEMINI_KEY")
      : (typeof process !== "undefined" ? process.env.API_GEMINI_KEY : "");

    if (!apiKey) {
      return new Response(
        JSON.stringify({ reply: "API_GEMINI_KEY is missing on Val.town environment variables." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const formattedContent = JSON.stringify(siteContent);
    const formattedProjects = JSON.stringify(projects);

    const systemPrompt = "You are the official AI Assistant for NEXT GEN DEVS STUDIO 🤖. You ONLY answer questions using the provided website and Firebase projects data below. If a user asks about anything unrelated to Next Gen Devs, decline politely. Website Data: " + formattedContent + " Projects: " + formattedProjects;

    const geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: systemPrompt },
              { text: "User Question: " + message }
            ]
          }
        ]
      })
    });

    const geminiData = await geminiResponse.json();
    const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Thank you for contacting Next Gen Devs!";

    return new Response(JSON.stringify({ reply: reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ reply: "Error: " + err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
}
