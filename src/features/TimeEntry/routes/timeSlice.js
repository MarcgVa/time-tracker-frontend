import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  timer: 0,
  isRunning: false,
}

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    setTime: (state, action) => {
      state.time.timer = action.payload
    },
    setIsRunning: (state, action) => {
      state.isRunning = action.payload.isRunning;
    },
    setProject: (state, action) => {
      state.project = action.payload;
      sessionStorage.setItem('cp', JSON.stringify(action.payload));
    },
  },
});


export const { setTime, setIsRunning, setProject } = timeSlice.actions;
export default timeSlice.reducer;

export const selectCurrentTime = (state) => state.time.timer;
export const selectIsRunning = (state) => state.isRunning;
export const selectCurrentProject = (state) => state.project;

