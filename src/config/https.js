import axios from "axios";
import store from "../stores";

const { auth } = store.getState();

export const axiosInstance = axios

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // if status code = 403, romove item token and user
    const statusCode = error.response.status;
    if (statusCode === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

