import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      const userInfo = {
        'id': action.payload.sub,
        'firstName': action.payload.given_name,
        'lastName': action.payload.family_name,
        'role': action.payload.role
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
