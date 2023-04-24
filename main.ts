import { serve } from "https://deno.land/std@0.184.0/http/server.ts";

const OPENAI_API_HOST = "api.openai.com";
serve(async (request) => {
  const url = new URL(request.url);
  const key = request.headers.get("Authorization");
  console.log("request:", request);
  const method = request.method;
  console.log("method:", method);

  var options = {
    headers: {
        "Access-Control-Request-Headers": "*",
        "Access-Control-Request-Method": "*"
    },
  }

  if (method === "OPTIONS") {
    const body = JSON.stringify({ message: "success" });
    return new Response(body, {
      status: 200,
      headers: {
        "Access-Control-Request-Headers": "*",
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Origin": "*"
      },
    });
  }

  if (url.pathname === "/") {
    return fetch(new URL("./README.md", import.meta.url));
  }

  url.host = OPENAI_API_HOST;
  return await fetch(url, {
    headers: {
      "Authorization": key,
    },
  });
});
