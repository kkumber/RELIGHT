import useApi from "../utils/api";
import { useState } from "react";

interface PostData {
  url: string;
  data: object;
}

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  fetchData: (url: string) => void;
  postData: (url: string, data: object) => Promise<void>;
}

const useFetch = (): FetchState<T> => {
  const api = useApi();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string) => {
    setIsLoading(false);
    setError(null);
    try {
      const res = await api.get(url);
      setData(res.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const postData = async (url: string, data: object) => {
    setIsLoading(false);
    setError(null);
    try {
      const res = await api.post(url, data, {
        headers: { "Content-type": "multipart/form-data" },
      });
      setData(res.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData, postData };
};

export default useFetch;
