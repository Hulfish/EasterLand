import axios from "axios";

import useAuth from "../hooks/auth-hook";

export const API_URL = "http://localhost:5000";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    "accessToken",
  )}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const { refresh, logout } = useAuth();
    if (error.response.status === 401) {
      try {
        // console.log("Need to get shower");
        const token = await refresh();
        if (!token) {
            return logout()
        }
        // console.log("refreshed")
        const initialRequest = error.config
        return $api.request(initialRequest)
      } catch (e) {
        console.log(e);
      }
    }
  },
);

export default $api;
