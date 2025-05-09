import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "something went wrong");
  }

  return responseData;
}

export default function useHttp(url, config, initialData) {
  const [loadedData, setLoadedData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  function clearLoadedData() {
    setLoadedData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(userData) {
      setLoading(true);
      setError(null);
      try {
        const responseData = await sendHttpRequest(url, {
          ...config,
          body: userData,
        });
        setLoadedData(responseData);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return { loadedData, loading, error, clearLoadedData, sendRequest };
}
