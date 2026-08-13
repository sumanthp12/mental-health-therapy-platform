import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/users`;

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API}/login`, {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (name, email, password) => {
  const response = await axios.post(`${API}/register`, {
    name,
    email,
    password,
  });

  return response.data;
};