import { useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useAccessTokenContext } from "../pages/Auth/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import useApi from "../utils/api";
import axios from "axios";

const ProtectedRoute = () => {
  const { accessToken, setAccessToken } = useAccessTokenContext();

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}accounts/auth/token/refresh/`,
        {},
        { withCredentials: true }
      );
      const newToken = res.data.access_token;
      setAccessToken(newToken);
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  };

  const auth = async () => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      const expTime = decoded.exp;
      const now = Date.now() / 1000;
      if (expTime! < now) {
        await refreshToken();
      }
    }
  };

  useEffect(() => {
    auth();
  }, []);

  const render = accessToken ? <Outlet /> : <Navigate to="/login" />;
  return render;
};

export default ProtectedRoute;
