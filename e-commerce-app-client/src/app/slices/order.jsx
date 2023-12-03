import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "../services/OrderService";

export const getOrdersByUserId = createAsyncThunk(
  "order/getByUserId",
  async ({ userId }) => {
    const res = await OrderService.getByUserId(userId);
    return res.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersByUserId.fulfilled, (state, action) => {
        state.orders = action.payload.result;
      })
  },
});

const orderReducer = orderSlice.reducer;
export default orderReducer;