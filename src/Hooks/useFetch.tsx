import axios from 'axios';
import React, {useEffect, useState} from 'react';

interface UseFetchProps {
  url: string;
}

const useFetch = ({url}: UseFetchProps) => {
  const [data, setData] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const source = axios.CancelToken.source(); //for unmounting

    const fetchData = async () => {
      try {
        const response = await axios.get(url, {cancelToken: source.token});
        setData(response.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel('Component unmounted, request canceled.');
    };
  }, [url]);
  return {data, loading, error};
};

export default useFetch;
