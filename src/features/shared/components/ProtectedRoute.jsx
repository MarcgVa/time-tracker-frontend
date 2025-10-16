import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentIsAuthenticated,
  selectCurrentToken,
} from "../../Auth/routes/authSlice";
import { getItem } from "../utils/sessionStorage";


export const ProtectedRoute = () => {
  const token = useSelector(selectCurrentToken) || getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
