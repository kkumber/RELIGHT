import useApi from "../utils/api";
import { useState } from "react";
import {
  useAccessTokenContext,
  useUserContext,
  useCSRFTokenContext,
} from "../pages/Auth/AuthProvider";

interface UserAuth {
  username: string;
  password: string;
}

interface UserRegisterData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

const useAuthFetch = () => {
  const api = useApi();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const { accessToken, setAccessToken } = useAccessTokenContext();
  const { csrf_token, setcsrf_token } = useCSRFTokenContext();
  const { user, setUser } = useUserContext();

  const getToken = async (loginData: UserAuth) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.post("accounts/auth/login/", loginData);
      setData(res.data);
      setAccessToken(res.data.access_token);
      setcsrf_token(res.data.csrf_token);
      setUser(res.data.user);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (registerData: UserRegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.post("accounts/register/", registerData);
      setData(res.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOutUser = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.post("accounts/auth/logout/", {});
      setData(res.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, getToken, registerUser, signOutUser };
};

export default useAuthFetch;
