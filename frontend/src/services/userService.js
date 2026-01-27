import API from "../api/axiosInstance";
const API_URL = "/users";
API.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
export const checkSuperAdminExists = () => {
  return API.get(`${API_URL}/check-super-admin`)
    .then((res) => res.data)
    .catch(() => ({ superAdminExists: true }));
};
export const register = (form) => {
  return API.post(`${API_URL}/register`, form)
    .then((res) => res.data);
};

export const login = (email, password) => {
  return API.post(`${API_URL}/login`, { email, password })
    .then((res) => res.data);
};

export const Forgotpassword = (email) => {
  return API.post(`${API_URL}/forgot-password`, { email })
    .then((res) => res.data);
};

export const Resetpassword = (token, password) => {
  return API.post(`${API_URL}/reset-password/${token}`, { password })
    .then((res) => res.data);
};

export const getMe = () => {
  return API.get(`${API_URL}/me`)
    .then((res) => res.data);
};

export const logout = () => {
  return API.post(`${API_URL}/logout`)
    
};
