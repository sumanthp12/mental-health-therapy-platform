import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ConversationList from "../../components/chat/ConversationList";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatMessages from "../../components/chat/ChatMessages";
import MessageInput from "../../components/chat/MessageInput";

import {
  getConversations,
  getMessages,
  sendMessage,
} from "../../services/chatService";

import LoadingSpinner from "../../components/ui/LoadingSpinner";
import EmptyState from "../../components/ui/EmptyState";
import ErrorState from "../../components/ui/ErrorState";

import { showError } from "../../utils/toast";

const loggedInUser = JSON.parse(localStorage.getItem("user"));

function TherapistMessages() {
    
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [conversationError, setConversationError] = useState(false);

    const [messagesLoading, setMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(false);

    const [sending, setSending] = useState(false);
    const location = useLocation();
    const conversationId = new URLSearchParams(location.search).get("id");

const fetchConversations = async () => {
  try {
    setLoading(true);
    setConversationError(false);

    const data = await getConversations();

    const validConversations = Array.isArray(data)
      ? data.filter(
          (conversation) =>
            conversation.participants &&
            conversation.participants.length === 2
        )
      : [];

    setConversations(validConversations);

    if (conversationId) {
      const conversation =
        validConversations.find(
          (item) => item._id === conversationId
        );

      if (conversation) {
        setSelectedConversation(conversation);
      } else if (validConversations.length > 0) {
        setSelectedConversation(
          validConversations[0]
        );
      } else {
        setSelectedConversation(null);
      }
    } else if (validConversations.length > 0) {
      setSelectedConversation(
        validConversations[0]
      );
    } else {
      setSelectedConversation(null);
    }
  } catch (error) {
    console.error(
      "Error fetching conversations:",
      error
    );

    setConversationError(true);

    showError(
      error?.response?.data?.message ||
        "Unable to load conversations."
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

const fetchMessages = async (conversationId) => {
  if (!conversationId) {
    setMessages([]);
    return;
  }

  try {
    setMessagesLoading(true);
    setMessagesError(false);

    const data = await getMessages(
      conversationId
    );

    const validMessages = Array.isArray(data)
      ? data
      : [];

    setMessages(validMessages);

    if (validMessages.length > 0) {
      const latest =
        validMessages[validMessages.length - 1];

      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === conversationId
            ? {
                ...conv,
                lastMessage: latest,
              }
            : conv
        )
      );
    }
  } catch (error) {
    console.error(
      "Error fetching messages:",
      error
    );

    setMessagesError(true);

    showError(
      error?.response?.data?.message ||
        "Unable to load messages."
    );
  } finally {
    setMessagesLoading(false);
  }
};

useEffect(() => {
    if (selectedConversation) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchMessages(selectedConversation._id);
        }
    }, [selectedConversation]);

const handleSendMessage = async (text) => {
  if (
    !selectedConversation ||
    !text.trim() ||
    sending
  ) {
    return;
  }

  try {
    setSending(true);

    const newMessage = await sendMessage({
      conversationId:
        selectedConversation._id,
      message: text,
    });

    await fetchMessages(
      selectedConversation._id
    );

    setConversations((prev) =>
      prev.map((conv) =>
        conv._id === selectedConversation._id
          ? {
              ...conv,
              lastMessage: newMessage,
            }
          : conv
      )
    );
  } catch (error) {
    console.error(
      "Error sending message:",
      error
    );

    showError(
      error?.response?.data?.message ||
        "Unable to send message. Please try again."
    );
  } finally {
    setSending(false);
  }
};

if (loading) {
  return (
    <LoadingSpinner
      fullScreen
      label="Loading conversations..."
    />
  );
}

if (conversationError) {
  return (
    <ErrorState
      title="Unable to load conversations"
      description="We couldn't load your conversations right now. Please try again."
      onRetry={fetchConversations}
      retryText="Reload Conversations"
    />
  );
}

  return (
    <div className="flex h-[calc(100vh-120px)] min-h-0 flex-col px-6">
      <div className="min-h-0 flex-1 overflow-hidden rounded-3xl bg-white shadow-lg">
        <div className="flex h-full">
          <div className="w-80 border-r flex-shrink-0">
            <ConversationList
                conversations={conversations}
                selectedConversation={selectedConversation}
                onSelect={setSelectedConversation}
                currentUserId={
                    loggedInUser?._id ||
                    loggedInUser?.id ||
                    loggedInUser?.user?._id
                    }
                />
          </div>
          <div className="flex h-full min-h-0 flex-1 flex-col">
            {selectedConversation ? (
                <>
                {/* Fixed Chat Header */}
                <div className="shrink-0">
                    <ChatHeader
                    conversation={selectedConversation}
                    currentUserId={
                        loggedInUser?._id ||
                        loggedInUser?.id ||
                        loggedInUser?.user?._id
                    }
                    />
                </div>

                {/* ONLY Messages Scroll */}
                <div className="min-h-0 flex-1 overflow-y-auto">
                    {messagesLoading ? (
                    <div className="flex h-full items-center justify-center">
                        <LoadingSpinner
                        label="Loading messages..."
                        />
                    </div>
                    ) : messagesError ? (
                    <div className="flex h-full items-center justify-center p-6">
                        <ErrorState
                        title="Unable to load messages"
                        description="We couldn't load this conversation right now."
                        onRetry={() =>
                            fetchMessages(
                            selectedConversation._id
                            )
                        }
                        retryText="Retry Messages"
                        />
                    </div>
                    ) : (
                    <ChatMessages
                        messages={messages}
                        currentUserId={
                        loggedInUser?._id ||
                        loggedInUser?.id ||
                        loggedInUser?.user?._id
                        }
                    />
                    )}
                </div>

                {/* Fixed Message Input */}
                <div className="shrink-0">
                    <MessageInput
                    onSend={handleSendMessage}
                    disabled={
                        !selectedConversation ||
                        sending ||
                        messagesLoading
                    }
                    />
                </div>
                </>
            ) : (
                <div className="flex flex-1 items-center justify-center p-8">
                <EmptyState
                    title="No conversations yet"
                    description="Your conversations with clients will appear here once messaging is available."
                />
                </div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default TherapistMessages;