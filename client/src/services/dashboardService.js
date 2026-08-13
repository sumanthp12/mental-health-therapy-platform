import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/dashboard`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getTherapistDashboard = async () => {
  const { data } = await API.get("/therapist");
  return data;
};

export const getClientDashboard = async () => {
  const { data } = await API.get("/client");
  return data;
};

export const getAdminDashboard = async () => {
  const { data } = await API.get("/admin");
  return data;
};