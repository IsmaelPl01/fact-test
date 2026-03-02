import axios from "axios";

// Default to standard .NET local port if not specified
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5168/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
