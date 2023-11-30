import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "../services/CartService";

export const getCartByUserId = createAsyncThunk(
  "cart/getByUserId",
  async ({ userId }) => {
    const res = await CartService.getByUserId(userId);
    return res.data;
  }
);

export const createUpdateCart = createAsyncThunk(
  "cart/createUpdateCart",
  async ({ data }) => {
    const res = await CartService.create(data);
    return res.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartByUserId.fulfilled, (state, action) => {
        console.log(action.payload);
        state.cart = action.payload.result;
      })
      .addCase(createUpdateCart.fulfilled, (state, action) => {
        console.log(action.payload);
      })
  },
});

const cartReducer = cartSlice.reducer;
export default cartReducer;



// {
//   "cartHeader": {
//     "id": 1,
//     "userId": "user123",
//     "couponCode": "SALE20"
//   },
//   "cartDetails": [
//     {
//       "id": 101,
//       "cartHeaderId": 1,
//       "cartHeader": null,
//       "productId": 500,
//       "count": 2,
//       "size": "Medium"
//     },
//     {
//       "id": 102,
//       "cartHeaderId": 1,
//       "cartHeader": null,
//       "productId": 201,
//       "count": 1,
//       "size": "Large"
//     }
//   ]
// }
