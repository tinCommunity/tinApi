interface RequestBody {
  [key: string]: any;
}

interface ResponseData {
  message: string;
  data?: any;
}

const server = Bun.serve({
  port: 3000,
  async fetch(req: Request): Promise<Response> {
    const url: URL = new URL(req.url);

    if (url.pathname === "/" && req.method === "GET") {
      return new Response("Bun API!");
    }

    if (url.pathname === "/api/data" && req.method === "GET") {
      const responseData: ResponseData = {
        message: "data API",
        data: [1, 2, 3]
      };

      return new Response(JSON.stringify(responseData), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/api/echo" && req.method === "POST") {
      const body: RequestBody = await req.json();
      return new Response(JSON.stringify({ received: body }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("not api", { status: 404 });
  },
});

console.log(`start http://localhost:${server.port}`);