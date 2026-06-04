import axios from "axios";

const API =
"http://localhost:8000/api/users";

export const loginUser =
async (email, password) => {

  const response =
  await axios.post(
    `${API}/login`,
    {
      email,
      password,
    }
  );

  return response.data;
};