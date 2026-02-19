export default {
  async fetch(request, env) {
    const anthropicResponse = await fetch("https://api.anthropic.com/v1/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.ANTHROPIC_API_KEY}`
      },
      body: JSON.stringify({
        model: "claude-v1",
        prompt: "Hello, Anthropic!",
        max_tokens_to_sample: 50
      })
    }).then(r => r.json());

    const moltbotResponse = await fetch("https://api.moltbot.com/query", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.MOLTBOT_GATEWAY_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: "Hello, MoltBot!" })
    }).then(r => r.json());

    return new Response(JSON.stringify({
      anthropic: anthropicResponse,
      moltbot: moltbotResponse
    }, null, 2), {
      headers: { "Content-Type": "application/json" }
    });
  }
}

