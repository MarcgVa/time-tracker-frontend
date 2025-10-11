import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"

export const ProtectedRoute = () => {
  const token = useSelector((state) => state.auth.token);
  if (!token) {
    return <Navigate to="/auth/login" />
  }
    return <Outlet/>;
}
