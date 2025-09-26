
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: window.sessionStorage.getItem("token") || null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      window.sessionStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      window.sessionStorage.removeItem('token');
      window.location.href = '/';
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;