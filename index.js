export default {
  async fetch(request, env) {

    // ---- Anthropic ----
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,          // ✅ correct header
        "anthropic-version": "2023-06-01"             // ✅ required header
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",                   // ✅ current model
        max_tokens: 50,                               // ✅ renamed from max_tokens_to_sample
        messages: [
          { role: "user", content: "Hello, Anthropic!" }
        ]
      })
    }).then(r => r.json());

    // ---- MoltBot ----
    const moltbotResponse = await fetch("https://api.moltbot.com/query", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.MOLTBOT_GATEWAY_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: "Hello, MoltBot!" })
    }).then(r => r.json());

    // ---- Response ----
    return new Response(JSON.stringify({
      anthropic: anthropicResponse,
      moltbot: moltbotResponse
    }, null, 2), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
