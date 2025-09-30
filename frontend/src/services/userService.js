import axios from "axios";

// 🔹 Base URL of your backend API
// change if your server runs on a different port
const API_URL = "http://localhost:5000/api/users";

// 🔹 Adds/removes the user id header used by getMe
export const setUserHeader = (id) => {
  if (id) {
    axios.defaults.headers.common["x-user-id"] = id;
  } else {
    delete axios.defaults.headers.common["x-user-id"];
  }
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// 🔹 Register a new user
export const register = (name, email, password, phone, role, avatar, address) => {
  return axios
    .post(`${API_URL}/register`, {
      name,
      email,
      password,
      phone,
      role,
      avatar,
      address,
    })
    .then((res) => res.data);
};

// 🔹 Login
export const login = (email, password) => {
  return axios
    .post(`${API_URL}/login`, { email, password })
    .then((res) => res.data);
};

// 🔹 Forgot Password
export const Forgotpassword = (email) => {
  return axios
    .post(`${API_URL}/forgot-password`, { email })
    .then((res) => res.data);
};

// 🔹 Reset Password
export const Resetpassword = (token, password) => {
  return axios
    .post(`${API_URL}/reset-password/${token}`, { password })
    .then((res) => res.data);
};

// 🔹 Get current user info (expects x-user-id header set)
export const getMe = (userId) => {
  // optional: pass as query string
  return axios
    .get(`${API_URL}/me`, { params: { userId } })
    .then((res) => res.data);
};
