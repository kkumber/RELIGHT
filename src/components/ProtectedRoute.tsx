import { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useAccessTokenContext, useUserContext } from "../utils/AuthProvider";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useApi from "../utils/api";

const ProtectedRoute = () => {
  const { accessToken, setAccessToken } = useAccessTokenContext();
  const { setUser } = useUserContext();
  const nav = useNavigate();
  const api = useApi();

  const refreshToken = async () => {
    const res = await api.post(
      "accounts/auth/token/refresh/",
      {},
      {
        withCredentials: true,
      }
    );
    const newToken = res.data.access_token;
    setAccessToken(newToken);
  };

  const auth = () => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      const expTime = decoded.exp;
      const now = Date.now() / 1000;
      if (expTime! < now) {
        refreshToken();
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
