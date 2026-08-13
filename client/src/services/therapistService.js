import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/therapists`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export const getTherapists = async () => {
  const { data } = await API.get("/");
  return data;
};


export const getAssignedTherapist = async () => {
  const { data } = await API.get("/assigned");
  return data;
};


export const createTherapist = async (therapistData) => {
  const { data } = await API.post("/", therapistData);
  return data;
};


export const updateTherapist = async (id, therapistData) => {
  const { data } = await API.put(`/${id}`, therapistData);
  return data;
};


export const deleteTherapist = async (id) => {
  const { data } = await API.delete(`/${id}`);
  return data;
};