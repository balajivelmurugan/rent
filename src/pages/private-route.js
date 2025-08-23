import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getTokensFromSW } from "./sw-utils";

export function PrivateRoute({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTokensFromSW().then((t) => {
      setToken(t);
      setLoading(false);
    });
  }, []);

  if (loading) return null; // or a spinner

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
