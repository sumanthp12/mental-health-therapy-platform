import { useEffect, useRef, useState } from "react";
import AIChatHeader from "../../components/ai/AIChatHeader";
import SuggestedPrompts from "../../components/ai/SuggestedPrompts";
import AIMessageList from "../../components/ai/AIMessageList";
import AIMessageInput from "../../components/ai/AIMessageInput";
import { chatWithAI, getAIHistory } from "../../services/aiService";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorState from "../../components/ui/ErrorState";
import { showError } from "../../utils/toast";

const ClientAISupport = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyError, setHistoryError] = useState(false);

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
      setHistoryLoading(true);
      setHistoryError(false);

      const history = await getAIHistory();

      if (history && history.length > 0) {
        setMessages(history);
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error(
        "Failed to load AI history:",
        error
      );

      setHistoryError(true);

      showError(
        error?.response?.data?.message ||
          "Unable to load your AI conversation."
      );
    } finally {
      setHistoryLoading(false);
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
      console.error("Failed to contact AI assistant:",
          error
        );

        showError(
          error?.response?.data?.message ||
            "Unable to contact the AI assistant. Please try again."
        );

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
  <div className="flex h-[calc(100vh-120px)] min-h-0 flex-col gap-4 pb-6">

    {/* AI Header + Suggested Prompts */}
    {messages.length === 0 && (
      <>
        <AIChatHeader />
        <SuggestedPrompts onSelect={handleSuggestedPrompt} />
      </>
    )}

    {/* Chat Container */}
    <div className="flex min-h-[360px] flex-1 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

      {/* Messages */}
      <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl bg-gray-50 p-8 text-left">
        {historyLoading ? (
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner
              label="Loading AI conversation..."
            />
          </div>
        ) : historyError ? (
          <div className="flex h-full items-center justify-center">
            <ErrorState
              title="Unable to load AI conversation"
              description="We couldn't load your previous AI conversation right now."
              onRetry={loadHistory}
              retryText="Reload Conversation"
            />
          </div>
        ) : (
          <AIMessageList
            messages={messages}
            loading={loading}
          />
        )}
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-gray-100 bg-white p-4">
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