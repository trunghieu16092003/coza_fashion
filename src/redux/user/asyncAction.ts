import { createAsyncThunk } from "@reduxjs/toolkit";
import { userServices } from "../../services";
import local from "../../constants/local";

export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: number;
  cart: Cart[];
}

interface Cart {
  id: string;
  pid: string;
  quantity: number;
}

export const getCurrent = createAsyncThunk(
  "user/current",
  async (_, { rejectWithValue }) => {
    console.log(localStorage.getItem(local.TOKEN));
    const res = await userServices.getProfile();
    if (!res) return rejectWithValue(res);
    return res;
  }
);
