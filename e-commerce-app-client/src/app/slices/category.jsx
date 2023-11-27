import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoryService from "../services/CategoryService";

export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async () => {
    const res = await CategoryService.getAll();
    return res.data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: []
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload.result;
      })
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
