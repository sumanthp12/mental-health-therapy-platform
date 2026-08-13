import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/payments`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const requestPayment = async (data) => {
  const response = await API.post("/request", data);

  return response.data;
};

export const getPaymentHistory = async () => {
  const response = await API.get("/history");

  return response.data;
};

export const createOrder = async (data) => {
  const response = await API.post(
    "/create-order",
    data
  );

  return response.data;
};

export const verifyPayment = async (data) => {
  const response = await API.post(
    "/verify",
    data
  );

  return response.data;
};