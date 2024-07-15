import axios from 'axios';
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(url);
        if (isMounted) {
          const fetchedData = await response.data;
          setData(fetchedData);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError(`${error.message}`);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return [data, loading, error];
}

export default useFetch;
