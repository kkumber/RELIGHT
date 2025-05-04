import { useCallback, useEffect, useState } from "react";
import useApi from "../utils/api";
import { FetchData } from "../pages/Home";

const useConcurrentFetch = (urls: string[]) => {
  const api = useApi();
  const [data, setData] = useState<FetchData[] | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (urls.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const responses = await Promise.all(
        urls.map((url) => api.get<FetchData>(url))
      );
      setData(responses.map((res) => res.data));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [urls]);

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useConcurrentFetch;
