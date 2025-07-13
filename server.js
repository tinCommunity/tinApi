const server = Bun.serve({
    port: 3000,
    async fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === "/" && req.method === "GET") {
            return new Response("get API!");
        }

        if (url.pathname === "/api/data" && req.method === "GET") {
            return new Response(JSON.stringify({ message: "get API", data: [1, 2, 3] }), {
                headers: { "Content-Type": "application/json" },
            });
        }

        if (url.pathname === "/api/echo" && req.method === "POST") {
            const body = await req.json();
            return new Response(JSON.stringify({ received: body }), {
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response("not api", { status: 404 });
    },
});

console.log(`Start http://localhost:${server.port}`);