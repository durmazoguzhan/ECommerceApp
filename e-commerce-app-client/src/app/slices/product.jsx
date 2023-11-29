import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../services/ProductService";

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async () => {
    const res = await ProductService.getAll();
    return res.data;
  }
);

export const getProduct = createAsyncThunk(
  "products/get",
  async ({ id }) => {
    const res = await ProductService.get(id);
    return res.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload.result;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        if (action.payload.result !== null)
          state.product[action.payload.result.id] = action.payload.result;
      })
  },
});

const productReducer = productSlice.reducer;
export default productReducer;
