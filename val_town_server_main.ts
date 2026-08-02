export default async function (req: Request): Promise<Response> {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // 1. GET Status Check
  if (req.method === "GET") {
    const apiKey = typeof Deno !== "undefined"
      ? (Deno.env.get("API_GEMINI_KEY") || Deno.env.get("GEMINI_API_KEY"))
      : "";
    const hasGemini = !!apiKey;
    return new Response(
      `حالة مفتاح جيميناي: ${
        hasGemini ? "موجود ✅" : "غير موجود ❌ (أضف API_GEMINI_KEY في Val.town)"
      }\nسيرفر الذكاء الاصطناعي لشركة NEXT GEN DEVS يعمل بنجاح 🚀🤖`,
      {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          ...corsHeaders,
        },
      },
    );
  }

  // 2. POST Chat Generation
  try {
    let body: any = {};
    const rawTextBody = await req.text();
    if (rawTextBody && rawTextBody.trim().length > 0) {
      try {
        body = JSON.parse(rawTextBody);
      } catch (e) {}
    }

    const apiKey = typeof Deno !== "undefined"
      ? (Deno.env.get("API_GEMINI_KEY") || Deno.env.get("GEMINI_API_KEY"))
      : "";

    if (!apiKey) {
      return Response.json({
        reply: "مفتاح API_GEMINI_KEY أو GEMINI_API_KEY غير موجود في إعدادات Val.town",
      }, { headers: corsHeaders });
    }

    let userText = "";
    if (typeof body.message === "string") userText = body.message;
    else if (typeof body.userMessage === "string") userText = body.userMessage;

    if (!userText) {
      return Response.json({
        reply: "أهلاً بك في NEXT GEN DEVS 🚀! كيف يمكنني مساعدتك في تطوير مشروعك اليوم؟\n\n📱 رقم الواتساب: 01020451206\n🔗 رابط التواصل المباشر: https://wa.me/201020451206",
      }, { headers: corsHeaders });
    }

    // Format Firebase Site Content & Projects Context
    const siteContentObj = body.siteContent || {};
    const projectsArr = body.projects || [];

    const formattedContent = Object.keys(siteContentObj).length > 0
      ? Object.entries(siteContentObj)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
      : "بيانات الموقع متاحة عبر الفيربيز.";

    const formattedProjects = Array.isArray(projectsArr) && projectsArr.length > 0
      ? projectsArr
          .map(
            (p: any) =>
              `- مشروع: ${p.title} | القسم: ${p.category} | الوصف: ${p.description} | الرابط: ${p.liveUrl || 'غير متاح'} | التقنيات: ${p.techStack?.join(", ") || 'React'}`
          )
          .join("\n")
      : "معرض الأعمال متاح عبر الويب سايت.";

    const customPrompt = body.systemInstruction ||
      `أنت المساعد الذكي الرسمي لشركة "NEXT GEN DEVS STUDIO" 🤖🚀.
تحدث باللهجة المصرية العصرية الراقية والودودة ("يا فنان"، "صديقي"، "يا بطل").
قواعدك الصارمة:
1. إجاباتك حصرياً عن شركة NEXT GEN DEVS، خدماتنا (تطوير المواقع، المتاجر الإلكترونية، تطبيقات الويب، تصميم UI/UX)، مشاريعنا، والاتصال بنا عبر الواتساب.
2. عندما تقترح على العميل التواصل معنا أو البدء في مشروع، اذكر دائماً تفاصيل الواتساب التالية بالضبط:
📱 رقم الواتساب: 01020451206
🔗 رابط التواصل المباشر: https://wa.me/201020451206
3. إذا سألك المستخدم عن أي شيء خارج هذا النطاق (مثل الطقس، أسئلة عامة، شركات أخرى)، اعتذر بلطف ووضّح أنك مخصص فقط لمساعدة عملاء NEXT GEN DEVS.

بيانات الويب سايت الفعلية من الفيربيز:
${formattedContent}

قائمة مشاريع الأعمال الحالية من الفيربيز:
${formattedProjects}`;

    const historyList = Array.isArray(body.history) ? body.history : [];
    const contents = [
      ...historyList.map((h: { role: string; text: string }) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: userText }] },
    ];

    // Priority model list based on supported Gemini Flash models
    const priorityModels = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-2.0-flash-lite",
      "gemini-1.5-flash",
      "gemini-flash-latest",
    ];

    let replyText = "";
    let lastErr = "";

    for (const modelName of priorityModels) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: customPrompt }] },
              contents,
            }),
          },
        );

        if (res.ok) {
          const data = await res.json();
          replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (replyText) break;
        } else {
          lastErr = await res.text();
        }
      } catch (err: any) {
        lastErr = err?.message || String(err);
      }
    }

    if (!replyText) {
      return Response.json({
        reply:
          "أهلاً بك في NEXT GEN DEVS 🚀! يسعدنا مساعدتك في تطوير موقعك أو متجرك الإلكتروني.\n\n📱 رقم الواتساب: 01020451206\n🔗 رابط التواصل المباشر: https://wa.me/201020451206",
        errorDetails: lastErr,
      }, { headers: corsHeaders });
    }

    return Response.json({
      reply: replyText,
      text: replyText,
      status: "success",
    }, { headers: corsHeaders });
  } catch (err: any) {
    return Response.json({
      reply: `حدث خطأ: ${err?.message || err}`,
    }, { headers: corsHeaders });
  }
}
