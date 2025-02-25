import axios from "axios";
import {jwtDecode} from "jwt-decode";
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

export const getUserId = () => {
  const cookies = document.cookie.split(";").map(cookie => cookie.trim());
  const authCookie = cookies.find(cookie => cookie.startsWith("Authorization"));
  if (!authCookie) {
    console.log("인증 정보가 없습니다.");
    return null;
  }
  return jwtDecode(authCookie.split("=")[1]);
};

export default api;
