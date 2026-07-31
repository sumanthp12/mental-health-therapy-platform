import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-end gap-3">
        {/* AI Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md">
          <Bot size={18} />
        </div>

        {/* Typing Bubble */}
        <div className="rounded-2xl rounded-bl-md border border-gray-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500"
              style={{ animationDelay: "0ms" }}
            ></span>

            <span
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500"
              style={{ animationDelay: "150ms" }}
            ></span>

            <span
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-500"
              style={{ animationDelay: "300ms" }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;