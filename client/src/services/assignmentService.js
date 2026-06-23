import axios from "axios";

const API = "http://localhost:8000/api/assignments";

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