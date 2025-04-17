import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  useAccessTokenContext,
  useUserContext,
} from "../pages/Auth/AuthProvider";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const { accessToken, setAccessToken } = useAccessTokenContext();
  const { setUser } = useUserContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}accounts/auth/token/refresh/`,
        {},
        { withCredentials: true }
      );
      const newToken = res.data.access_token;
      setAccessToken(newToken);
      setUser(res.data.user);
    } catch (error) {
      console.error("Token refresh failed:", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      if (accessToken) {
        const decoded = jwtDecode(accessToken);
        const now = Math.floor(Date.now() / 1000);
        if (decoded?.exp && decoded.exp < now) {
          await refreshToken();
        }
      } else {
        await refreshToken();
      }
      setLoading(false);
    };
    authenticate();
  }, [accessToken]);

  if (loading) return <div>Loading...</div>;
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
