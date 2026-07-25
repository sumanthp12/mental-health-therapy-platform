import { useState } from "react";
import { SendHorizonal } from "lucide-react";

function MessageInput({ onSend, disabled = false }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const message = text.trim();

    if (!message || disabled) return;

    onSend(message);
    setText("");
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-center gap-3">

        <input
          type="text"
          value={text}
          placeholder="Type a message..."
          disabled={disabled}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        />

        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          <SendHorizonal size={18} />
          Send
        </button>

      </div>
    </div>
  );
}

export default MessageInput;