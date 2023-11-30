import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IdentityService from "../services/IdentityService";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ returnUrl }) => {
    const res = await IdentityService.login(returnUrl);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: false,
    user: null,
  },
  reducers: {
    login: (state) => {
      state.status = true;
      state.user = null
    },
    register: (state, action) => {
      let { name, email, pass } = action.payload;
      state.status = true;
      state.user = {
        name: name,
        role: "customer",
        email: email,
        pass: pass,
      };
    },
    logout: (state) => {
      console.log("user slice logouta gelindi");
      state.status = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("loginUser-fulfilled: " + action.payload);
        // state.brands = action.payload.result;
      })
  }
});

const userReducer = userSlice.reducer;
export default userReducer;
