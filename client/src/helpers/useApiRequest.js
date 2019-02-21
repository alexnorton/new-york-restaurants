import { useState, useEffect } from 'react';
import axios from 'axios';
import { objectToSearchString } from './searchString';

function useApiRequest(path, params) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  async function fetchData() {
    setError(false);
    setLoading(true);

    try {
      let url = '/api/' + path;

      if (params) {
        const searchString = objectToSearchString(params);
        url += searchString;
      }

      const result = await axios(url);

      setData(result.data);
    } catch (fetchError) {
      setError(fetchError);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [path, params]);

  return { loading, error, data };
}

export default useApiRequest;
