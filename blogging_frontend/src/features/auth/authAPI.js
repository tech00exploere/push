import API from "../../api/axios.jsx";

export const registerUser = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
    return res.data;
  } catch (err) {
    // Return error message from backend or generic
    throw err.response?.data?.message || err.message;
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await API.post("/auth/login", userData);
    return res.data;
  } catch (err) {
    throw err.response?.data?.message || err.message;
  }
};
