import axios from "axios";

const API_URL = "http://localhost:8000/api/dashboard";

export const getTherapistDashboard = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(`${API_URL}/therapist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};