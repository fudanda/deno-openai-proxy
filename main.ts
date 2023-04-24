import { serve } from "https://deno.land/std@0.184.0/http/server.ts";

const OPENAI_API_HOST = "api.openai.com";
serve(async (request) => {
  const url = new URL(request.url);
  console.log("Path:", url.pathname);
  console.log("Query parameters:", url.searchParams);
  console.log("key:", url.searchParams.get('key'));
  console.log("url:", url);
  console.log("request:", request);

  if (url.pathname === "/") {
    return fetch(new URL("./Readme.md", import.meta.url));
  }
  const key =('Bearer '+url.searchParams.get('key'))  as string;
  url.host = OPENAI_API_HOST;
  return await fetch(url, {
    headers: {
      "Authorization": key
    },
  });
});
