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

const loggedInUser = JSON.parse(localStorage.getItem("user"));

function ClientMessages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const conversationId = new URLSearchParams(location.search).get("id");

  const fetchConversations = async () => {
    try {
      const data = await getConversations();

        // Remove invalid conversations
        const validConversations = data.filter(
        (conversation) =>
            conversation.participants &&
            conversation.participants.length === 2
        );

        setConversations(validConversations);

        if (conversationId) {
        const conversation = validConversations.find(
            (item) => item._id === conversationId
            );

        if (conversation) {
          setSelectedConversation(conversation);
        } else if (data.length > 0) {
          setSelectedConversation(data[0]);
        }
      } else if (data.length > 0) {
        setSelectedConversation(data[0]);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
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
    try {
      const data = await getMessages(conversationId);

      setMessages(data);

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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedConversation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchMessages(selectedConversation._id);
    }
  }, [selectedConversation]);

  const handleSendMessage = async (text) => {
    if (!selectedConversation || !text.trim()) return;

    try {
      const newMessage = await sendMessage({
        conversationId: selectedConversation._id,
        message: text,
      });

      await fetchMessages(selectedConversation._id);

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
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading conversations...
      </div>
    );
  }

  return (
  <div className="px-6 h-[calc(100vh-120px)]">

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
    <div className="h-[calc(100%-80px)] overflow-hidden rounded-3xl bg-white shadow-lg">

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
        <div className="flex h-full">

          {/* Conversation List */}
          <div className="w-80 border-r">

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

          {/* Chat Area */}
          <div className="flex flex-1 flex-col">

            <ChatHeader
              conversation={selectedConversation}
              currentUserId={
                loggedInUser?._id ||
                loggedInUser?.id ||
                loggedInUser?.user?._id
              }
            />

            <ChatMessages
              messages={messages}
              currentUserId={
                loggedInUser?._id ||
                loggedInUser?.id ||
                loggedInUser?.user?._id
              }
            />

            <MessageInput
              onSend={handleSendMessage}
              disabled={!selectedConversation}
            />

          </div>

        </div>

      )}

    </div>

  </div>
);
}

export default ClientMessages;