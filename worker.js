export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      // TODO: Add your custom API logic here
      return new Response("Ok");
    }
    return env.ASSETS.fetch(request);
  },
};
