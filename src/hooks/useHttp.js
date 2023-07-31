import { useCallback, useState } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async function (config, functionData) {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(config.url, {
        method: config.method ? config.method : "GET",
        body: config.body ? JSON.stringify(config.body) : null,
        headers: config.headers,
      });

      if (!response.ok) {
        throw new Error("Error!!!!!!!");
      }

      const data = await response.json();

      functionData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  return { error, loading, fetchData, setLoading };
};

export default useHttp;
