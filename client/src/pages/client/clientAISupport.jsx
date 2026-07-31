import { useState } from "react";
import AIChatHeader from "../../components/ai/AIChatHeader";
import SuggestedPrompts from "../../components/ai/SuggestedPrompts";
import AIMessageList from "../../components/ai/AIMessageList";
import AIMessageInput from "../../components/ai/AIMessageInput";
import { chatWithAI } from "../../services/aiService";

const clientAISupport = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [input, setInput] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);

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
    <div className="space-y-6">
    <AIChatHeader />

    {messages.length === 0 && (
      <SuggestedPrompts onSelect={handleSuggestedPrompt} />
    )}

    <div className="flex h-[600px] flex-col gap-4">
      <AIMessageList
        messages={messages}
        loading={loading}
      />

      <AIMessageInput
        input={input}
        setInput={setInput}
        onSend={sendMessage}
        loading={loading}
      />
    </div>
  </div>
);
};

export default clientAISupport;