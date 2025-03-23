import axios from "axios";
import { useAccessTokenContext } from "./AuthProvider";

const useApi = () => {
  const { accessToken, setAccessToken } = useAccessTokenContext();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await api.post(
            "accounts/auth/token/refresh/",
            {},
            {
              withCredentials: true,
            }
          );
          setAccessToken(res.data.access_token);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${res.data.access_token}`;
          return api(originalRequest);
        } catch (err) {
          setAccessToken(null);
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default useApi;
