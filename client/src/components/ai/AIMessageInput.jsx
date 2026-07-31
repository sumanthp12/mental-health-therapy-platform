import { useRef } from "react";
import { SendHorizonal } from "lucide-react";

const MAX_CHARACTERS = 1000;

const AIMessageInput = ({
  input,
  setInput,
  onSend,
  loading,
}) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);

    const textarea = textareaRef.current;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleKeyDown = (e) => {
    // Enter = Send
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!loading && input.trim()) {
        onSend();
      }
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-end gap-3">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={MAX_CHARACTERS}
          placeholder="How are you feeling today?"
          className="max-h-40 min-h-[48px] flex-1 resize-none overflow-y-auto rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button
          onClick={onSend}
          disabled={loading || !input.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          <SendHorizonal size={20} />
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <p>Press Enter to send • Shift + Enter for a new line</p>

        <span>
          {input.length}/{MAX_CHARACTERS}
        </span>
      </div>
    </div>
  );
};

export default AIMessageInput;