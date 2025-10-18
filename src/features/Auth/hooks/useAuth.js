import { useSelector, useDispatch } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
} from "../routes/authApi";
import { setCredentials, logout } from "../routes/authSlice";
import { api } from "../../../app/api";
import { useState } from "react";

const useAuth = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { user, isAuthenticated, token } = useSelector((state) => state.auth);
  const [loginApi] = useLoginMutation();
  const [registerApi] = useRegisterMutation();
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserQuery(undefined, {
    skip: !isAuthenticated, // Skip fetching user if not authenticated
  });

  const signIn = async (credentials) => {
    try {
      const result = await loginApi(credentials).unwrap();
      dispatch(setCredentials({ token: result.token, user: result.user }));
      return result;
    } catch (err) {
      if (!err?.originalStatus) {
        setError("No Server Response");
      } else if (err.originalStatus?.status === 400) {
        setError("Missing UserName or Password");
      } else if (err.originalStatus?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
    }
  };

  const signUp = async (userData) => {
    try {
      const result = await registerApi(userData).unwrap();
      dispatch(setCredentials({ token: result.token, user: result.user }));
      return result;
    } catch (err) {
      if (!err?.originalStatus) {
        setError("No Server Response");
      } else if (err.originalStatus?.status === 400) {
        setError("Missing required fields");
      } else if (err.originalStatus?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Registration Failed");
      }
    }
  };

  const signOut = () => {
    dispatch(logout());
    // Optionally, invalidate RTK Query cache for auth-related data
    dispatch(api.util.resetApiState());
  };

  return {
    user: isAuthenticated ? userData || user : null, // Prefer fetched user data if available
    isAuthenticated,
    token,
    signIn,
    signUp,
    signOut,
    isUserLoading,
    isUserError,
    error,
  };
};

export { useAuth };
