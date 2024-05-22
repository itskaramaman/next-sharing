import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { setLoggedInUser } = appSlice.actions;
export default appSlice.reducer;
