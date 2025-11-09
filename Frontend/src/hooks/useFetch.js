// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch data from an API
 * @param {string} url - API endpoint
 * @param {object} options - Axios options (method, headers, body)
 * @param {boolean} autoFetch - Fetch data automatically on mount
 * @returns {object} { data, error, loading, refetch }
 */
const useFetch = (url, options = {}, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(autoFetch);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        method: options.method || 'GET',
        headers: options.headers || {},
        data: options.body || null,
      });

      setData(response.data);
    } catch (err) {
      console.error('useFetch error:', err);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  // Auto-fetch on mount if autoFetch is true
  useEffect(() => {
    if (autoFetch) fetchData();
  }, [fetchData, autoFetch]);

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;
