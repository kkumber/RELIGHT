import { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import useAuthFetch from "../hooks/useAuthFetch";
import { useAccessTokenContext, useUserContext } from "../utils/AuthProvider";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { data, isLoading, error, getRefreshToken } = useAuthFetch();
  const { accessToken } = useAccessTokenContext();
  const { setUser } = useUserContext();
  const nav = useNavigate();

  const refreshToken = async () => {
    await getRefreshToken();
  };

  // PRoblem: Context refreshes when page reloads
  const auth = () => {
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      const expTime = decoded.exp;
      const now = Date.now() / 1000;
      if (expTime! < now) {
        refreshToken();
      }
      return nav("/");
    } else {
      return nav("/login");
    }
  };

  useEffect(() => {
    auth();
  }, []);

  const render = accessToken ? <Outlet /> : <Navigate to="/login" />;
  return render;
};

export default ProtectedRoute;
