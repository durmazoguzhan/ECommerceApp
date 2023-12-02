import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      const userInfo = {
        id: action.payload.profile.sub,
        firstName: action.payload.profile.given_name,
        lastName: action.payload.profile.family_name,
        role: action.payload.profile.role,
        token: action.payload.access_token
      };
      state.user = userInfo;
      console.log("successfully logged in.");
    },
    logout: (state) => {
      state.user = null;
      console.log("successfully logged out.");
    }
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
