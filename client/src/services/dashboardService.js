import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/dashboard",
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