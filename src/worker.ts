export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === "/") {
      url.pathname = "/en/";
      return Response.redirect(url.toString(), 308);
    }

    const m = pathname.match(/^\/([a-z]{2})(?:-[A-Z]{2})?$/);
    if (m) {
      url.pathname = `/${m[1]}/`;
      return Response.redirect(url.toString(), 308);
    }

    return env.ASSETS.fetch(request);
  },
};
