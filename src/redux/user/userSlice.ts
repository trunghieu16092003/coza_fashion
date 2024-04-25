import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "./asyncAction";
import * as actions from "./asyncAction";

interface UserState {
  isLoggedIn: boolean;
  current: UserData[] | null;
  isLoading: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
  current: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.getCurrent.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(actions.getCurrent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
      });
  },
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;
