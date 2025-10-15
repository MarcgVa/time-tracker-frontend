import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentIsAuthenticated,
  selectCurrentToken,
} from "../../Auth/routes/authSlice";
import { getItem } from "../utils/sessionStorage";
import { usePersistedSessionState } from "../hooks/usePersistedSessionState";

export const ProtectedRoute = () => {
  const [token, setToken] = usePersistedSessionState(
    "token",
    useSelector(selectCurrentToken)
  );

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
