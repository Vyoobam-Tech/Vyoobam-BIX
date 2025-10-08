import axios from "axios";


const API_URL = "http://localhost:5000/api/users";


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


export const login = (email, password) => {
  return axios
    .post(`${API_URL}/login`, { email, password })
    .then((res) => res.data);
};


export const Forgotpassword = (email) => {
  return axios
    .post(`${API_URL}/forgot-password`, { email })
    .then((res) => res.data);
};

export const Resetpassword = (token, password) => {
  return axios
    .post(`${API_URL}/reset-password/${token}`, { password })
    .then((res) => res.data);
};


export const getMe = (userId) => {

  return axios
    .get(`${API_URL}/me`, { params: { userId } })
    .then((res) => res.data);
};
