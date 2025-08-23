import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getTokensFromSW } from "./sw-utils";

export function PrivateRoute({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    getTokensFromSW().then((t) => {
      console.log("Token from SW:", t);
      setToken(t);
    });
  }, []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
