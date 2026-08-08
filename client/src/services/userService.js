import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/users",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export const getUsers = async () => {
  const { data } = await API.get("/");
  return data;
};


export const updateUser = async (id, userData) => {
  const { data } = await API.put(`/${id}`, userData);
  return data;
};


export const deleteUser = async (id) => {
  const { data } = await API.delete(`/${id}`);
  return data;
};