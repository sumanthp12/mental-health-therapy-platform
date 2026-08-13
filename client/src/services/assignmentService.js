import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/assignments`;

export const assignTherapist = async (data, token) => {
  const response = await axios.post(
    API,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};