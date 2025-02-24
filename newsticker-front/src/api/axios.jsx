import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8085",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const isAuthenticated = () => {
  const cookies = document.cookie.split("; ");
  return cookies.some((cookie) => cookie.startsWith("Authorization="));
};

export default api;
