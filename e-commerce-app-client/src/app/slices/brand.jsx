import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BrandService from "../services/BrandService";

export const getAllBrands = createAsyncThunk(
  "brands/getAll",
  async () => {
    const res = await BrandService.getAll();
    return res.data;
  }
);

export const getBrand = createAsyncThunk(
  "brands/get",
  async ({ id }) => {
    const res = await BrandService.get(id);
    return res.data;
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
    brand: {}
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.brands = action.payload.result;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.brand[action.payload.result.id] = action.payload.result;
      })
  },
});

const brandReducer = brandSlice.reducer;
export default brandReducer;
