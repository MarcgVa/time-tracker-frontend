import { useSelector, useDispatch } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
} from "../routes/authApi";
import { setCredentials, logout } from "../routes/authSlice";
import { api } from "../../../app/api";




const useAuth = () => {
 
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
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  
  const signUp = async (userData) => {
    try {
      const result = await registerApi(userData).unwrap();
      dispatch(setCredentials({ token: result.token, user: result.user }));
      return result;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
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
  };
}

export default useAuth
