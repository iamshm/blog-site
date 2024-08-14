import axios from "axios";

const baseURL = import.meta.env.VITE_API_ENDPOINT;

const BlogApiHandler = axios.create({
  baseURL,
});

export const setAuthorizationToken = (token: string) => {
  localStorage.setItem("token", token);
};

BlogApiHandler.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers.Authorization = token ? `Bearer ${token}` : "";

  return config;
});

export const deleteAuthorizationToken = () => {
  localStorage.removeItem("token");
};

export default BlogApiHandler;
