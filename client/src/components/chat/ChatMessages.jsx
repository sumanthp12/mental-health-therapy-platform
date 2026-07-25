import { useEffect, useRef } from "react";

function ChatMessages({
  messages = [],
  currentUserId,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gray-50">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-400">
          No messages yet.
        </div>
      ) : (
        messages.map((message) => {
          const senderId =
            typeof message.sender === "object"
              ? message.sender?._id
              : message.sender;

          const isMine = senderId === currentUserId;

          return (
            <div
              key={message._id}
              className={`flex ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[78%] lg:max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
                  isMine
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-white text-gray-900 rounded-bl-md"
                }`}
              >
                <p className="break-words">
                  {message.message}
                </p>

                <p
                  className={`text-xs mt-2 ${
                    isMine
                      ? "text-blue-100"
                      : "text-gray-400"
                  }`}
                >
                  {new Date(
                    message.createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default ChatMessages;