import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

function ClientMessages() {
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
        const conversation = validConversations.find(
          (item) => item._id === conversationId
        );

        if (conversation) {
          setSelectedConversation(conversation);
        } else if (validConversations.length > 0) {
          setSelectedConversation(validConversations[0]);
        } else {
          setSelectedConversation(null);
        }
      } else if (validConversations.length > 0) {
        setSelectedConversation(validConversations[0]);
      } else {
        setSelectedConversation(null);
      }
    } catch (err) {
      console.error(
        "Error fetching conversations:",
        err
      );

      setConversationError(true);

      showError(
        err?.response?.data?.message ||
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

        const data = await getMessages(conversationId);

        setMessages(Array.isArray(data) ? data : []);

        if (data.length > 0) {
          const latest = data[data.length - 1];

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
      } catch (err) {
        console.error(
          "Error fetching messages:",
          err
        );

        setMessagesError(true);

        showError(
          err?.response?.data?.message ||
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
        conversationId: selectedConversation._id,
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
    } catch (err) {
      console.error(
        "Error sending message:",
        err
      );

      showError(
        err?.response?.data?.message ||
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

    {/* Page Header */}
    <div className="mb-6">
      <h1 className="text-4xl font-bold">
        Messages
      </h1>

      <p className="mt-2 text-slate-500">
        Stay connected with your therapist.
      </p>
    </div>

    {/* Messages Container */}
    <div className="min-h-0 flex-1 overflow-hidden rounded-3xl bg-white shadow-lg">

      {conversations.length === 0 ? (

        /* Empty State */
        <div className="flex h-full items-center justify-center px-6">

          <div className="flex max-w-xl flex-col items-center text-center">

            {/* Icon */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-12 w-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a10.5 10.5 0 01-4.083-.8L3 20l1.4-3.5A7.64 7.64 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>

            {/* Title */}
            <h2 className="mt-6 text-2xl font-bold text-slate-800">
              No Conversations Yet
            </h2>

            {/* Description */}
            <p className="mt-3 max-w-lg text-base leading-7 text-slate-500">
              Your therapist conversation will appear here once a therapist
              has been assigned to you.
            </p>

            {/* Status */}
            <div className="mt-6 rounded-2xl bg-blue-50 px-6 py-4">

              <p className="font-semibold text-blue-700">
                Waiting for Therapist Assignment
              </p>

              <p className="mt-1 text-sm text-blue-600">
                Once your therapist is assigned, you'll be able to
                communicate with them here.
              </p>

            </div>

          </div>

        </div>

      ) : (

        /* Existing Chat UI */
        <div className="flex h-full min-h-0 flex-col">
          {selectedConversation ? (
            <>
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
                description="Your conversation with your therapist will appear here once messaging is available."
              />
            </div>
          )}
        </div>

      )}

    </div>

  </div>
);
}

export default ClientMessages;