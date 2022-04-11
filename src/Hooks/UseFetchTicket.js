import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function UseFetchTicket(id) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ticket, setTicket] = useState({});
  const [refresh, setRefresh] = useState(0);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tickets/${id}`);
      await setTicket(res?.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, refresh]);

  useEffect(() => {
    sendQuery(id);
  }, [id, sendQuery]);

  return { loading, error, ticket, setRefresh };
}

export default UseFetchTicket;
