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
      <div className="flex min-h-0 flex-1 items-center justify-center rounded-2xl bg-gray-50 p-8 text-center">

        <div className="flex max-w-lg flex-col items-center">

          {/* AI Icon */}
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Bot size={30} />
          </div>

          {/* Heading */}
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome to AI Wellness Assistant
          </h2>

          {/* Description */}
          <p className="mt-2 max-w-md leading-6 text-gray-500">
            Ask anything related to stress, anxiety, mindfulness,
            motivation, emotional wellbeing, or daily mental wellness.
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto rounded-2xl bg-gray-50 p-5">

      <div className="flex flex-col space-y-5">

        {messages.map((message, index) => (
          <AIMessageBubble
            key={index}
            message={message}
          />
        ))}

        {loading && <TypingIndicator />}

        <div ref={bottomRef} />

      </div>

    </div>
  );
};

export default AIMessageList;