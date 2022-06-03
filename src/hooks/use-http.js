import { useCallback, useState } from 'react';

const useHttp = () => {
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request Failed");
      }

      const data = await response.json();

      applyData(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }, []);

  return {
    sendRequest,
    error,
  };
};

export default useHttp
// https://insw-dev.ilcs.co.id/n

// /n/tarif?hs_code=22030091