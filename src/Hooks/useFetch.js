import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(query, page = 1, sort) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [metaData, setMetaDate] = useState({ hasMore: true });

  const sendQuery = useCallback(async () => {
    if (metaData?.hasMore || page === 1) {
      try {
        await setLoading(true);
        await setError(false);
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/tickets`,
          {
            params: {
              page,
              queryText: query,
              sort: JSON.stringify(sort),
            },
          }
        );
        await setList((prev) =>
          page === 1 ? [...res?.data?.data] : [...prev, ...res?.data?.data]
        );
        await setMetaDate({ ...res?.data });
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, refresh, sort]);

  useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, page]);

  return { loading, error, list, metaData, setRefresh };
}

export default useFetch;
