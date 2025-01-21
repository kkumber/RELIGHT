import useApi from "../utils/api";
import { useState } from "react";



interface PostData {
    url: string,
    data: object,
}

const useFetch = () => {
    const api = useApi();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>();

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
                headers: {'Content-type': 'multipart/form-data'}
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

    return {data, isLoading, error, fetchData, postData};
};
 
export default useFetch;