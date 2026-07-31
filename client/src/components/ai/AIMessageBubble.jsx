import { Bot, User, Copy } from "lucide-react";

const AIMessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[85%] items-end gap-3 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        {/* Avatar */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full shadow-md ${
            isUser
              ? "bg-blue-600 text-white"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>

        {/* Message */}
        <div
          className={`group rounded-2xl px-5 py-4 shadow-sm transition-all ${
            isUser
              ? "bg-blue-600 text-white rounded-br-md"
              : "border border-gray-200 bg-white text-gray-800 rounded-bl-md"
          }`}
        >
          <p className="whitespace-pre-wrap leading-7">
            {message.content}
          </p>

          <div
            className={`mt-3 flex items-center justify-between text-xs ${
              isUser ? "text-blue-100" : "text-gray-500"
            }`}
          >
            <span>{message.time}</span>

            {!isUser && (
              <button
                onClick={handleCopy}
                className="opacity-0 transition-opacity group-hover:opacity-100"
                title="Copy response"
              >
                <Copy size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMessageBubble;