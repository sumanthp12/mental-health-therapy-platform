import { useEffect, useRef } from "react";
import AIMessageBubble from "./AIMessageBubble";
import TypingIndicator from "./TypingIndicator";
import { Bot } from "lucide-react";

const AIMessageList = ({ messages, loading }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Bot size={30} />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">
          Welcome to AI Wellness Assistant
        </h2>

        <p className="mt-2 max-w-md text-gray-500">
          Ask anything related to stress, anxiety, mindfulness,
          motivation, emotional wellbeing, or daily mental wellness.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-5 overflow-y-auto rounded-2xl bg-gray-50 p-5">
      {messages.map((message, index) => (
        <AIMessageBubble
          key={index}
          message={message}
        />
      ))}

      {loading && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
};

export default AIMessageList;