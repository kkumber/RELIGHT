import { useState, useEffect } from "react";
import useApi from "../utils/api";
import axios from "axios";
import { FetchData } from "../pages/Home";

const useConcurrentFetch = (urls: string[]) => {
  const api = useApi();
  const requests = urls.map((url) => api.get(url));
  const [data, setData] = useState<FetchData[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (urls.length === 0) return; // Avoid unnecessary calls if URLs are empty.

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all URLs concurrently
        const responses = await axios.all(requests);
        setData(responses.map((response) => response.data));
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useConcurrentFetch;
