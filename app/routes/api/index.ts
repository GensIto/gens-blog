import { Env, Hono } from "hono";
import { streamText } from "hono/streaming";

const app = new Hono<Env>();

async function* parseSSE(response: ReadableStream) {
  const reader = response.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6);
        if (data === "[DONE]") continue;

        try {
          const parsed = JSON.parse(data);
          if (parsed.response) yield parsed.response;
        } catch {}
      }
    }
  } finally {
    reader.releaseLock();
  }
}

const route = app
  .get("/hello", (c) => {
    return c.json({ message: "Hello, World!" });
  })
  .post("/rag", async (c) => {
    try {
      const { markdown } = await c.req.json();

      if (!markdown) {
        return c.json({ error: "Markdown is required" }, 400);
      }

      const ai = c.env.AI;

      const res = await ai.autorag("haiku-kigo-search").aiSearch({
        query: markdown,
      });

      return c.json({
        success: true,
        data: res.data,
      });
    } catch (error) {
      console.error("Embedding error:", error);
      return c.json(
        {
          error: "Failed to create embedding",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        500
      );
    }
  })
  .post("/summarize", async (c) => {
    const { text } = await c.req.json();
    if (!text) return c.json({ error: "Text is required" }, 400);

    try {
      const response = await c.env.AI.run("@cf/meta/llama-3.1-8b-instruct-fp8", {
        messages: [
          {
            role: "system",
            content: "あなたは記事の内容を簡潔にまとめる専門家です。",
          },
          {
            role: "user",
            content: `以下の記事を端的に3〜4文で要約してください。「以下がこの記事の要約です。」などの接頭語は不要で、要約内容のみを出力してください：\n\n${text}`,
          },
        ],
        max_tokens: 256,
        stream: true,
      });

      return streamText(c, async (stream) => {
        for await (const chunk of parseSSE(response)) {
          await stream.write(chunk);
        }
      });
    } catch (error) {
      console.error("Summarization error:", error);
      return c.json(
        {
          error: "Failed to summarize text",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        500
      );
    }
  });

export type AppType = typeof route;
export default app;
