import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8085",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const isAuthenticated = () => {
  console.log("현재 쿠키:", document.cookie); // 쿠키 확인용
  const cookies = document.cookie.split(";").map(cookie => cookie.trim());
  return cookies.some(cookie => cookie.startsWith("Authorization"));
};


export default api;
