import { useCallback, useEffect, useState } from "react";

export async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error("something went wrong");
  }

  return responseData;
}

export default function UseHttp({ url, config }) {
  const [loadedData, setLoadedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = useCallback(
    async function sendRequest() {
      setLoading(true);

      try {
        const responseData = await sendHttpRequest(url, config);

        setLoadedData(responseData);
      } catch (error) {
        setError(error.message || "Something went wrong");
      }

      setLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest(url, config);
    }
  }, [sendHttpRequest, config]);

  return { loadedData, loading, error, sendRequest: sendHttpRequest };
}
