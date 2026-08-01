import { useEffect, useRef, useState } from "react";
import AIChatHeader from "../../components/ai/AIChatHeader";
import SuggestedPrompts from "../../components/ai/SuggestedPrompts";
import AIMessageList from "../../components/ai/AIMessageList";
import AIMessageInput from "../../components/ai/AIMessageInput";
import { chatWithAI, getAIHistory } from "../../services/aiService";

const ClientAISupport = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const loadHistory = async () => {
    try {
      const history = await getAIHistory();

      if (history && history.length > 0) {
        setMessages(history);
      }
    } catch (error) {
      console.error("Failed to load AI history:", error);
    }
  };

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const sendMessage = async (messageText = input) => {
    const text = messageText.trim();

    if (!text || loading) return;

    const userMessage = {
      role: "user",
      content: text,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const response = await chatWithAI(text);

      const aiMessage = {
        role: "assistant",
        content:
          response.reply ||
          "I'm sorry, I couldn't generate a response.",
        time: getCurrentTime(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong while contacting the AI assistant. Please try again.",
          time: getCurrentTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedPrompt = (prompt) => {
    sendMessage(prompt);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col">
      {messages.length === 0 && (
        <>
          <AIChatHeader />
          <SuggestedPrompts onSelect={handleSuggestedPrompt} />
        </> 
      )}

      <div className="mt-4 flex flex-1 flex-col overflow-hidden rounded-xl border bg-white">
        <div className="flex-1 min-h-0 p-6">
          <AIMessageList
            messages={messages}
            loading={loading}
          />

          <div ref={bottomRef} />
        </div>

        <div className="border-t p-4">
          <AIMessageInput
            input={input}
            setInput={setInput}
            onSend={sendMessage}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientAISupport;