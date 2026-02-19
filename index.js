export default {
  async fetch(request, env) {
    try {
      // Anthropic call
      const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 50,
          messages: [{ role: "user", content: "Hello, Anthropic!" }]
        })
      });
      const anthropicText = await anthropicRes.text(); // ✅ text first, not .json()

      // MoltBot call
      const moltbotRes = await fetch("https://api.moltbot.com/query", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.MOLTBOT_GATEWAY_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: "Hello, MoltBot!" })
      });
      const moltbotText = await moltbotRes.text(); // ✅ text first so we see the raw error

      return new Response(JSON.stringify({
        anthropic_status: anthropicRes.status,
        anthropic_raw: anthropicText,
        moltbot_status: moltbotRes.status,
        moltbot_raw: moltbotText       // 👈 this will show us exactly what MoltBot returns
      }, null, 2), { headers: { "Content-Type": "application/json" } });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
}
