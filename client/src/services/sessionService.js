import axios from "axios";

const API =
"http://localhost:8000/api/sessions";

export const getSessions =
async () => {

  const token =
  localStorage.getItem(
    "token"
  );

  const response =
  await axios.get(
    API,
    {
      headers: {
        Authorization:
        `Bearer ${token}`,
      },
    }
  );

  return response.data;
};