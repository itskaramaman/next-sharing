import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refreshTasks: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleRefreshTasks: (state) => {
      state.refreshTasks = !state.refreshTasks;
    },
  },
});

export const { toggleRefreshTasks } = appSlice.actions;
export default appSlice.reducer;
