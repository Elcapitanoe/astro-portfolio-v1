export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;

    if (host === "www.domiadi.com") {
      url.hostname = "domiadi.com";
      return Response.redirect(url.toString(), 308);
    }
    
    const m = path.match(/^\/([a-z]{2})(?:-[A-Z]{2})?$/);
    if (m) {
      url.pathname = `/${m[1]}/`;
      return Response.redirect(url.toString(), 308);
    }

    return env.ASSETS.fetch(request);
  },
};
