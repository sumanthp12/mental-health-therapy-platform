import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/users`,
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

export const getProfile = async () => {
  const { data } = await API.get("/profile");
  return data;
};

export const updateProfile = async (profileData) => {
  const { data } = await API.put(
    "/profile",
    profileData
  );

  return data;
};

export const changePassword = async (passwordData) => {
  const { data } = await API.put(
    "/change-password",
    passwordData
  );

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