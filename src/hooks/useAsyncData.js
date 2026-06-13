import { useEffect, useState } from 'react';

export function useAsyncData(loader, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    loader()
      .then((response) => {
        if (active) {
          setData(response.data);
        }
      })
      .catch((caughtError) => {
        if (active) {
          setError(caughtError);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, dependencies);

  return { data, loading, error };
}
