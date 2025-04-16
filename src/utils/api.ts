import axios from "axios";
import { useAccessTokenContext, useCSRFTokenContext, useUserContext } from "../pages/Auth/AuthProvider";

const useApi = () => {
  const { accessToken, setAccessToken } = useAccessTokenContext();
  const { csrf_token, setcsrf_token } = useCSRFTokenContext();
  const { user, setUser } = useUserContext();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        config.headers["X-CSRFToken"] = csrf_token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config; // Get the original request that caused the error

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        try {
          originalRequest._retry = true;

          const res = await axios.post(`${import.meta.env.VITE_API_URL}accounts/auth/token/refresh/` , {}, {withCredentials: true});
          const newAccessToken = res.data.access_token;
          setAccessToken(newAccessToken);
          setcsrf_token(res.data.csrf_token);
          setUser(res.data.user);

          // Retry the original request before the error with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (e) {
          return Promise.reject(e);
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default useApi;
