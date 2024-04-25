import { createSlice } from "@reduxjs/toolkit";
import local from "../../constants/local";

const initialState = {
  isLoggedIn: localStorage.getItem(local.TOKEN) ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
