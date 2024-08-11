import axios from "axios";

const baseUrl = "https://backend.surajhm.workers.dev/api/v1";
// const baseUrlLocal = "http://localhost:53853/api/v1";

const BlogApiHandler = axios.create({
  baseURL: baseUrl,
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
