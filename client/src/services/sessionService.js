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

export const approveSession = async (sessionId) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${API}/${sessionId}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const completeSession = async (sessionId) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${API}/${sessionId}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};