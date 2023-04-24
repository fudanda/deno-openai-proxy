import { serve } from "https://deno.land/std@0.184.0/http/server.ts";

const OPENAI_API_HOST = "api.openai.com";
serve(async (request) => {
  const url = new URL(request.url);
  const key=request.headers.get('Authorization');
  console.log("request:", request);

  const method=request.url.method;
  if(method==='OPTIONS'){
    return new Response("success");
  }
  if (url.pathname === "/") {
    return fetch(new URL("./README.md", import.meta.url));
  }

  url.host = OPENAI_API_HOST;
  return await fetch(url, {
    headers: {
      "Authorization": key
    },
  });
});
