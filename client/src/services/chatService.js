import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/chat`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const findOrCreateConversation = async (participantId) => {
  const conversations = await getConversations();

  const existing = conversations.find((conversation) =>
    conversation.participants?.some(
      (participant) => participant._id === participantId
    )
  );

  if (existing) {
    return existing;
  }
  return await createConversation(participantId);
};

export const getConversations = async () => {
  const { data } = await API.get("/conversations");
  return data;
};

export const getMessages = async (conversationId) => {
  const { data } = await API.get(`/messages/${conversationId}`);
  return data;
};

export const sendMessage = async (messageData) => {
  const { data } = await API.post("/message", messageData);
  return data;
};

export const createConversation = async (participantId) => {
  const { data } = await API.post("/conversation", {
    participantId,
  });

  return data;
};

export const markMessagesAsRead = async (conversationId) => {
  const { data } = await API.patch(
    `/read/${conversationId}`
  );

  return data;
};

export const getUnreadCount = async () => {
  const { data } = await API.get("/unread-count");
  return data;
};

export default {
  getConversations,
  getMessages,
  sendMessage,
  createConversation,
  findOrCreateConversation,
  markMessagesAsRead,
  getUnreadCount,
};