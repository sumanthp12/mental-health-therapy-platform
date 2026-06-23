import axios from "axios";

const API = "http://localhost:8000/api/users";

export const getUsers = async (token) => {
  const response = await axios.get(
    API,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};