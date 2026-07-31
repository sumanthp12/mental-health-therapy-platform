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

      <div className="mb-6">
        <h1 className="text-4xl font-bold">
          Messages
        </h1>

        <p className="mt-2 text-slate-500">
          Stay connected with your therapist.
        </p>
      </div>

      <div className="h-[calc(100%-80px)] overflow-hidden rounded-3xl bg-white shadow-lg">

        <div className="flex h-full">

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

      </div>

    </div>
  );
}

export default ClientMessages;