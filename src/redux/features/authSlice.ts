import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const appSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload.user;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { logIn, logOut } = appSlice.actions;
export default appSlice.reducer;
