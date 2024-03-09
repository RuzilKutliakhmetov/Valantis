import React, { useEffect, useState, useCallback } from 'react';

// import api from './api';
// import type { RESPONSE_DATA } from './api';

import './App.css';

function Paginator() {
  const [data, setData] = useState<RESPONSE_DATA | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get.data(page);
        setData(response);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Unknown Error: api.get.data'
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return <div className='App'>...</div>;
}

export default Paginator;