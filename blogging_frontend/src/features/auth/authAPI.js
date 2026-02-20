import API from "../../api/axios";

// Register new user
export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

// Login existing user
export const loginUser = async (userData) => {
  const res = await API.post("/auth/login", userData);
  return res.data;
};
