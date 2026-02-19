export default {
  async fetch(request, env) {
    const apiKey = env.ANTHROPIC_API_KEY;
    return new Response(`API key length: ${apiKey.length}`);
  }
}
