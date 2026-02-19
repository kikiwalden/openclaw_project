export default {
  async fetch(request, env) {
    // 🔒 Guard the gateway — check the token on incoming requests
    const token = request.headers.get("Authorization");
    if (token !== `Bearer ${env.MOLTBOT_GATEWAY_TOKEN}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
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
      const anthropic = await anthropicRes.json();

      return new Response(JSON.stringify({ anthropic }, null, 2), {
        headers: { "Content-Type": "application/json" }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
}
