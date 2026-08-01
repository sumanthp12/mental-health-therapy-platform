import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/ai",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const chatWithAI = async (message) => {
  const response = await API.post("/chat", {
    message,
  });

  return response.data;
};

export const getAIHistory = async () => {
  const response = await API.get("/history");
  return response.data.messages;
};