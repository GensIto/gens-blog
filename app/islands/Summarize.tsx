import { useState } from "hono/jsx";
import { honoClient } from "../lib/hono";

export const Summarize = ({ text }: { text: string }) => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onSummarize = async () => {
    setIsLoading(true);
    setSummary("");

    try {
      const response = await honoClient.summarize.$post({
        json: { text: text },
      });

      if (!response.ok) {
        throw new Error("Failed to summarize");
      }

      setIsOpen(true);

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setSummary(accumulated);
      }
    } catch (error) {
      console.error("Summarization error:", error);
      setSummary("要約の生成に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        class='btn btn-soft fixed bottom-4 right-4'
        onClick={onSummarize}
        disabled={isLoading}
      >
        {isLoading ? "生成中..." : "Ai Summarize"}
      </button>
      {summary && isOpen && (
        <div
          className={`chat chat-end fixed bottom-16 right-4 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className='chat-bubble bg-gray-50 text-gray-900'>
            <button
              className='ml-auto block w-4 h-4'
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18 18 6M6 6l12 12'
                />
              </svg>
            </button>
            <p className='text-sm'>{summary}</p>
          </div>
        </div>
      )}
    </>
  );
};
